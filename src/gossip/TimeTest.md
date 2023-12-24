---
tag:
  - java
---

# System.currentTimeMillis() 性能探究

## 背景

在项目中，我们经常需要获取当前时间戳。
在Java中，获取当前时间戳最简单的方法就是使用System.currentTimeMillis()方法。
而如果在网络上搜索System.currentTimeMillis()，你会看到很多文章说System.currentTimeMillis()方法并发性能很差， 应该避免使用。
然而看他们给出的代码，你会发现两个疑点：<br>

1.他们的代码将带 CAS 操作的多线程并发和无 CAS 操作的单线程进行了对比。
这显然是不合理的，CAS 高并发下存在显著的性能问题，CAS 操作可能会频繁空转占用大量时间，高并发下甚至性能还不如直接加悲观锁。
如果一定要比较，也应该都 CAS/悲观锁 或者都不使用 CAS/悲观锁。

2.他们认为系统只有一个全局时钟源，高并发或频繁访问会造成严重争用。
然而，即使只有一个时钟，System.currentTimeMillis() 作为一个纯读取的函数，理论上它的并发也不需要发生争用。
只有当操作系统刷新时钟的瞬间，操作系统的写入操作才可能会和其他任意读取操作发生争用。

## 测试代码

多说无益，直接上代码。编写了多线程情况下，System.currentTimeMillis()、Instant.now() 以及 Hutool 工具类中的 SystemClock.now()
三种获取当前时间戳的方法的性能测试代码。
以及单线程、多线程下 System.currentTimeMillis() 的性能对比代码。
而且多线程对比写了两份，一份包含 CAS 用时，一份不将 CAS 用时放入结果。
每次测试会循环 100 次取平均值，每次循环会对每种 API 各取 100 万次时钟，多线程的线程数量和当前运行设备的 CPU 线程数相同。

以下代码已在 [Gitee](https://gitee.com/lixuhlll/SomeTest.git) 开源
::: code-tabs#TestTime

@tab 多线程包含 CAS 用时

```java
import cn.hutool.core.date.SystemClock;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
public class TimeTest {

    private static final ExecutorService executor = Executors.newFixedThreadPool(
            Runtime.getRuntime().availableProcessors()
    );

    private static final int count1 = 100;
    private static final int count2 = 1_000_000;

    public static void main(String[] args) throws InterruptedException {

        double avr1 = 0, avr2 = 0, avr3 = 0;

        for (int i = 0; i < count1; i++) {
            long t1 = getRunTime(System::currentTimeMillis);
            long t2 = getRunTime(Instant::now);
            long t3 = getRunTime(SystemClock::now);
            log.info("System.currentTimeMillis, 多线程用时：{} ns", t1);
            log.info("Instant.now, 多线程用时：{} ns", t2);
            log.info("SystemClock.now, 多线程用时：{} ns", t3);
            avr1 += 1.0 * t1 / count1;
            avr2 += 1.0 * t2 / count1;
            avr3 += 1.0 * t3 / count1;
        }

        log.info("System.currentTimeMillis, 多线程平均用时：{} ns", avr1);
        log.info("Instant.now, 多线程平均用时：{} ns", avr2);
        log.info("SystemClock.now, 多线程平均用时：{} ns", avr3);
        
        executor.shutdown();
    }

    private static long getRunTime(Runnable run) throws InterruptedException {
        var latch = new CountDownLatch(TimeTest.count2);
        long start = System.nanoTime();

        for (int i = 0; i < TimeTest.count2; i++) {
            executor.execute(() -> {
                try {
                    run.run();
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        return System.nanoTime() - start;
    }
}

```

@tab 多线程不包含 CAS 用时

```java
import cn.hutool.core.date.SystemClock;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.LongAdder;

@Slf4j
public class TimeTest2 {

    private static final ExecutorService executor = Executors.newFixedThreadPool(
            Runtime.getRuntime().availableProcessors()
    );

    private static final int count1 = 100;
    private static final int count2 = 1_000_000;

    public static void main(String[] args) throws InterruptedException {

        double avr1 = 0, avr2 = 0, avr3 = 0;

        for (int i = 0; i < count1; i++) {
            long t1 = getRunTime(System::currentTimeMillis);
            long t2 = getRunTime(Instant::now);
            long t3 = getRunTime(SystemClock::now);
            log.info("System.currentTimeMillis, 多线程用时：{} ns", t1);
            log.info("Instant.now, 多线程用时：{} ns", t2);
            log.info("SystemClock.now, 多线程用时：{} ns", t3);
            avr1 += 1.0 * t1 / count1;
            avr2 += 1.0 * t2 / count1;
            avr3 += 1.0 * t3 / count1;
        }

        log.info("System.currentTimeMillis, 多线程平均用时：{} ns", avr1);
        log.info("Instant.now, 多线程平均用时：{} ns", avr2);
        log.info("SystemClock.now, 多线程平均用时：{} ns", avr3);

        executor.shutdown();
    }

    private static long getRunTime(Runnable run) throws InterruptedException {
        var latch = new CountDownLatch(TimeTest2.count2);
        LongAdder adder = new LongAdder();

        for (int i = 0; i < TimeTest2.count2; i++) {
            executor.execute(() -> {
                try {
                    long start = System.nanoTime();
                    run.run();
                    long end = System.nanoTime();
                    adder.add(end - start);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        return adder.sum();
    }
}

```

@tab 单线程多线程对比

```java
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.LongAdder;

@Slf4j
public class TimeTest3 {

    private static final ExecutorService executor = Executors.newFixedThreadPool(
            Runtime.getRuntime().availableProcessors()
    );

    private static final int count1 = 100;
    private static final int count2 = 1_000_000;

    public static void main(String[] args) throws InterruptedException {

        double avr1 = 0, avr2 = 0;

        for (int i = 0; i < count1; i++) {
            long t1 = getRunTime(System::currentTimeMillis);
            long t2 = getSingleRunTime(System::currentTimeMillis);
            log.info("System.currentTimeMillis, 多线程用时：{} ns", t1);
            log.info("System.currentTimeMillis, 单线程用时：{} ns", t2);
            avr1 += 1.0 * t1 / count1;
            avr2 += 1.0 * t2 / count1;
        }

        log.info("System.currentTimeMillis, 多线程平均用时：{} ns", avr1);
        log.info("System.currentTimeMillis, 单线程平均用时：{} ns", avr2);

        executor.shutdown();
    }

    private static long getRunTime(Runnable run) throws InterruptedException {
        var latch = new CountDownLatch(TimeTest3.count2);
        LongAdder adder = new LongAdder();

        for (int i = 0; i < TimeTest3.count2; i++) {
            executor.execute(() -> {
                try {
                    long start = System.nanoTime();
                    run.run();
                    long end = System.nanoTime();
                    adder.add(end - start);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        return adder.sum();
    }

    private static long getSingleRunTime(Runnable run) {
        long adder = 0;

        for (int i = 0; i < TimeTest3.count2; i++) {
            long start = System.nanoTime();
            run.run();
            long end = System.nanoTime();
            adder += (end - start);
        }

        return adder;
    }
}

```

:::

## 测试结果

测试用 Java 版本：java 17.0.9 2023-10-17 LTS

本来打算画几个折线图，先放上平均时间，折线图下次再画。

::: tabs#结果
@tab 多线程包含 CAS 用时
17:30:59.899 [main] INFO TimeTest - System.currentTimeMillis, 多线程平均用时：1.31782509E8 ns
17:30:59.900 [main] INFO TimeTest - Instant.now, 多线程平均用时：1.42121775E8 ns
17:30:59.900 [main] INFO TimeTest - SystemClock.now, 多线程平均用时：1.24788407E8 ns

@tab 多线程不包含 CAS 用时
17:36:00.346 [main] INFO TimeTest2 - System.currentTimeMillis, 多线程平均用时：2.9434522E7 ns
17:36:00.347 [main] INFO TimeTest2 - Instant.now, 多线程平均用时：4.3430665E7 ns
17:36:00.347 [main] INFO TimeTest2 - SystemClock.now, 多线程平均用时：2.5953399E7 ns

@tab 单线程用时
17:36:55.872 [main] INFO TimeTest3 - System.currentTimeMillis, 多线程平均用时：2.4671727E7 ns
17:36:55.873 [main] INFO TimeTest3 - System.currentTimeMillis, 单线程平均用时：2.2627341E7 ns

:::

## 结论

1.可以发现，一旦包含 CAS 用时，实际运行时间会高出整整一个数量级。

2.System.currentTimeMillis() 多线程并发并不会出现严重性能下降，性能差距大概在 10% 左右。

3.缓存时间戳（SystemClock.now）确实有一些提升性能的效果，但效果并不是特别显著，差不多就是单线程和多线程
System.currentTimeMillis() 的区别。

4.System.currentTimeMillis() 调用一次撑死占用几十纳秒，这种性能损耗基本不会影响业务逻辑。

以上结论都是基于我的测试代码，如果各位有更好的测试方法，欢迎留言讨论。
