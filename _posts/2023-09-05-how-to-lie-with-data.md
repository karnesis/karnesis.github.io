---
layout: post
title: How to lie with data 
subtitle: A comprehensive guide
cover-img: /assets/img/data-lies-post/lie_with_data.png
thumbnail-img: /assets/img/data-lies-post/thumb.png
share-img: /assets/img/data-lies-post/thumb.png
tags: [data, statistics, lie, data science]
comments: true
---

We are living in the era of information, and it's truly exciting. We can reach any kind of knowledge within milliseconds, and just from the palm of our hands. Today it is very hard to even remember how our everyday life was without this immediate access to information. I mean, remember making bets with your friends? In order to find out who's right and who's wrong we had to ask an "expert" of <div title="Probably that weird uncle that happened to be in the same room">dubious credentials</div>, or worse, we had to physically go to the library. Sometimes I would spend too much time searching for the correct answer, being filled with anticipation for the time when I'd finally brag about how right I am (<div title="Screw you Bill, your intuition was always wrong, you jerk!">and how wrong was Bill</div>). Now it takes seconds!

This instantaneous access to data makes our lives much easier; we can check immediately when a piece of information is true or false or verify one's claims by directly accessing and assessing the data. In principle, that would be a step towards a more civilised society, where any given discussion only happens on the solid grounds of measurements and crucial information; a society where the discussion would be focusing on possible solutions to our problems, rather than wasting time on ineffectual and counterproductive disagreements.

Well... in hindsight, it is now obvious that we are not very effective in exploiting this vast network of information. Instead, we find ourselves being constantly bombarded with data of dubious quality, coming from all possible directions. Sometimes, the information that reaches our screens is quite obviously ridiculous: alien probes, flat Earths, anti-vaccine junk, crab people, reptile people, people people... you name it. But quite often, the data we are being served are presented under a fancy wrapping, which makes it hard to resist or even rebut.

Yes, information backed by faulty data or poor analyses is among the most dangerous. It appears credible and is challenging to verify within short timeframes, such as during a roundtable discussion or even a multi-day meeting. Consequently, individuals adept at manipulating data and information can deceive more effectively. This is exactly what we are going to focus on in this post. We are going to learn _how to lie with data_. Or, to put it correctly, _how to spot questionable analysis and faulty information_.

But _why lie with data?_ You might ask. Well, five basic reasons:

1. *It's damn easy!* The most important part is that it is so easy to lie with data! In order to prove a point, we can manipulate the data, do a superficial analysis, or simply tell half the truth. Piece of cake! 
2. *Many people do it!* Just take a look at the news, or social media, private discussions, politicians, family dinners, you name it...
3. *First impressions matter!* They [really do](https://news.illinois.edu/view/6367/557440)! Rebuttals that come later have very little effect in correcting the sentiment of a strong first impression. Lying works!
4. *It gets your point across with ease!* Nothing better than a few numbers to back up your claims, wether it's about politics, sports, or even unfortunately science (where it just gets your paper published quickly and painlessly). But on a more _serious_ note about science:
5. In the grant scheme of things, where productivity (quantity) is rewarded more than actual understanding (quality), people are forced to resort to such practices. When survival is at stake, proper procedures, deep studies, reproducibility, ethics, [...], are the first to be thrown out of the window. 

As already mentioned, lying with data is easy, but we need to learn how to do it properly. For that reason, I have gathered the different types of lying strategies into a few categories. For each category we can also assign a "malevolence score", which is indicates the level of malevolence of the given practicer. Here they are:

1. <div title="★★★★★">Direct Data manipulation</div>
2. <div title="★★★☆☆">Analyzing and/or presenting flawed or biased data</div> 
3. <div title="★★★★☆">Abusing statistics</div>
4. [Bonus point] <div title="★★★★★★★★★★★★★★★★★★★">It’s all about presentation</div>  

So, let us begin with the first category, which is no other than:

--- 

## 1. Direct Data Manipulation (★★★★★)

If you want to lie, directly manipulating your data is the easiest thing to do. It will makes things easier for you, but it is also a quite dangerous practice. It is dangerous because eventually people get caught, and when that happens there is no way back. Forging your data is both evil and stupid, and that's why it scores 5/5 stars in the malevolence scale. While sometimes the maliciousness can not be denied, we must acknowledge that desperate people might resort to such extreme practices. The driver is usually the very high level of competitiveness within certain fields, such as the "publish or perish" dogma in academia, or being selected for the prestigious open position in the council or committee. When people are fighting for their survival, ethical dilemmas are easily bypassed, sometimes without much consideration. 

Naturally, direct lying is very effective in certain areas outside academia as well. This is especially true in situations where the "practitioner" just needs to win the first impression. Yep, you guessed that right, I am talking about politics. There are countless examples of people applying this strategy, whether intentionally or not. Imagine a panel of political opponents. It doesn't really matter who is right and who is wrong, but who appears to be right at the given time, while being confident about it. Fake statistics are very helpful in this regard. If the lie is exposed at a later time, it has little effect because most of the times [the information is not distributed to the same audience](https://en.wikipedia.org/wiki/Fact-checking), or simply because [first impressions matter](https://arxiv.org/pdf/1503.07921)! 

There have been countless examples of this practice in academia, and I was planning to summarize at least some of them. But then I got a bit depressed by some of the actual stories behind the news, so I'll just leave the [link to wikipedia article](https://en.wikipedia.org/wiki/List_of_scientific_misconduct_incidents) instead. 

On the other hand it's always fun to spot direct lies by public figures, such as the claim that schools can perform gender-affirming surgeries to [pupils](https://edition.cnn.com/2024/09/04/politics/donald-trump-fact-check-children-gender-affirming-surgery/index.html), or the outrageous [allegation that immigrants feast on the cute pets of innocent people](https://www.youtube.com/watch?v=5llMaZ80ErY). But on a more serious note, next time you hear a politician addressing the public, ask yourself why they chose to present this particular number or statistic or measure, and where it came from. At best case scenario the quoted figure is true and computed by some expert. Even so, usually a single high-level statistical measure can not encapsulate the full picture of the situation, which is something that we will investigate below. 

--- 

## 2. Flawed or Biased Data (★★★☆☆)

This is a very interesting case of lying with data, which, most of the times is done unintentionally. Not everyone has the background knowledge to interpret scientific graphs, let alone to correctly analyze and interpret a given set of data. One needs to be extra careful about the data available, and what they can really tell us about the question that we need to answer. Sometimes, their limitations are difficult to spot, and even experts are having trouble processing them. I mean, I am a trained scientist working with data all my life, but I wouldn't dare to try to interpret data from another scientific discipline (for example a data set of control groups for a heart condition drug). I would leave that to my fellow colleagues, who are experts in their respective field. Let us know look at some examples of data limitations:

See the picture below (taken from the relevant [wikipedia article](https://en.wikipedia.org/wiki/Survivorship_bias)), which was used *a lot* during the pandemic. It represents the so-called _survival bias_, which is a special case of selection bias. The story goes as this: Imagine we are aviation engineers during the WWII and need to optimize armor reinforcement based on the sustained damage of planes that returned to base. The supposed damage is represented by the red dots in the figure. I would immediately (and naively) start patching up the damaged area, hoping that the plane would hold better during the next mission. Needless to say that I'd by fooling myself. I would be forgetting that I am  planning an upgrade strategy based on the planes that actually _made it back_, or in other words, on a biased sample of the overall population. 
<p align="center">
<img src="https://en.wikipedia.org/wiki/Survivorship_bias#/media/File:Survivorship-bias.svg" alt= "We need more armor Jim!" width="50%" height="50%">
</p>
A practice like this would inevitably lead to ineffective solutions (extra armor on those areas would pose minimal benefits, if any at all), and essentially no change on the survival rate of the planes. I should instead reinforce parts of the plane that were not damaged, because those should be the most critical for the keeping the plane in the sky (cockpit, engines, the middle of the wings, etc). 

Another example of a biased data-set is when asking questions to non-representative parts of the population. For example, we shouldn't be asking about alcohol consumption during the local Beer Fest, or about peoples' favorite pie during an apple-pie contest. As you can imagine, designing a good field study is tricky and requires a lot of effort. That's why it's better to leave this part to the experts.
<p align="center">
<img src="/assets/img/data-lies-post/burgerfest.png" alt= "So, are you vegan, or vegetarian?" width="50%" height="50%">
</p>

On the other hand, a too small data-set is also problematic. See the graph below, it shows the two possible outcomes of a fair coin-toss experiment. If we stop the experiment too early, we will most probably get the wrong answer.
<p align="center">
<img src="small_dataset.png" alt= "We need more coins Jim!" width="50%" height="50%">
</p>

--- 

## 3. Abusing statistics (★★★★☆)

Ah, one of my favorites... That is because it can be intentional or not, but it's always more glaring when it's the former! For the first case, it is somehow forgivable, because not everyone is really trained to interpret statistical measures of a given quantity. This is fine, we people make mistakes <div title="Yes, it is a constant struggle">_all_ the time</div>... But it is just our responsibility to educate ourselves and others and be better! 

### 3.1 Correlation is not causation

Sometimes, when you need to prove that A causes B, and therefore we need to take some action related to A, you just need to show some correlation between them. Take for example the figure below:
<p align="center">
<img src="/assets/img/data-lies-post/funny_correlations.png" alt= "Is Nick Cage to blame here?" width="50%" height="50%">
</p>
This is an example of spurious correlation, and I can not possibly imagine a casual model to connect the two measurements. 

In general, statistical models are difficult to write down, and sometimes challenging to interpret. There is a whole scientific discipline that tries to infer causality from statistical measures, and it is one of the best approaches we have in order to help us find meaningful connections between As and Bs. Unfortunately, some people choose to bypass all the caveats and just use the high-level information that suits their narrative. You can amuse yourselves with more weird correlated data-sets [here](https://www.tylervigen.com/spurious-correlations).

### 3.2 Summary statistics

Quite often, in order to get a point across we have to use high-order summary statistics. We say for example "the mean household holds X% of that", or "a typical local man always goes for the A option", or "more people prefer Y rather than Z". These statements should be fine in principle, but the danger is that the big picture can be blurred under single-number measures. Take for example the quantity of the mean household income, which was estimated at around 80 k$ for 2014 in the US. Just by this number alone, one may arrive to the conclusion that the "typical american household earns 80 k$ per year", which might not be completely true. To get the full picture we should study the picture below, which shows the actual distribution of income across the population. We notice that many more households are earning much less than 80 k$, which means that the "typical american family" is unfortunately a bit poorer than initially estimated. So, what is happening here?
<p align="center">
<img src="https://www.census.gov/library/visualizations/2015/demo/distribution-of-household-income--2014/_jcr_content/root/responsivegrid/embeddableimage65.coreimg.png/1459361296671/hh-inc-dist.png" alt="Distribution of household income (2014)" width="50%" height="50%">
</p>
The mean can be biased due to highly-skewed data, and this is the root of our misunderstanding. The high and very high income families, even if fewer in actual numbers, have disproportionately larger earnings than low-income households, and are thus biasing the measure towards higher income values. The median, which is more robust against data outliers, is preferred in these situations. See figure below for a comparison between mean and median estiamtes. 
<p align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/2022_Average_and_median_family_income%2C_by_age_-_US.svg/1600px-2022_Average_and_median_family_income%2C_by_age_-_US.svg.png" alt="Mean vs Median [from Wikipedia]" width="50%" height="50%">
</p>

In summary, we should always be careful with high-order statistics. When in doubt, we need to go back and look at the (distribution of the) data!  

### 3.3 Hacking 

When cheating, we can be imaginative. Highly technical details are hard to spot, and are many times hidden under layers of technical procedures. "Tweaking" some minor detail here, or "fixing an effect" there, can have considerable impact on the final result, which is no other than the single metric we report on scientific papers. Experts are usually able to spot those things, but sometimes replication of the whole analysis procedure is needed! However, the problem is that replication does not bring $ or fame, and therefore is quite often ignored, or completely omitted altogether. One might argue that this system is far from perfect, but so far it's the best we have. Eventually, malpractices in science are discovered, and people face the consequences (see section of _Direct data manipulation_ above). 

### 3.3.1 Bad fits



### 3.3.2 p-hacking, a special category of hacking

In statistics, we need to use metrics in order to decide between two competing hypotheses (science, duh!). In classical statistics, we have been using what is called the P-values. We begin by inventing two categories: The H0 is the so-called _null hypothesis_, which usually refers to the negative relationship of the particular effect, i.e. "There is no signal present" or "There is no difference between the two populations". H1 is the opposite. So, "the p-value is the probability of obtaining test results at least as extreme as the result actually observed, under the assumption that the null hypothesis is correct".

<p align="center">
<img src="https://www.spiritofgrace.org/images/2015/confused_Depositphotos_21369665_original.jpg" alt= "Yeah, this was not very helpful, I know..." width="50%" height="50%">
</p>

In a nutshell, P-value calculations assume that the null hypothesis is true and use that assumption to determine the likelihood of obtaining your observed sample data. P-values answer the question, "Are your sample data unusual if the null hypothesis is true?" At best, p-values indicate the degree of compatibility between a dataset and a particular hypothetical explanation (such as a null hypothesis), which is usually not the question we would like to answer. At the same time, we have adopted a particular threshold (the 0.05) which is somewhat arbitrary. Finally, the p-value does not indicate the size or importance of the observed effect. A small p-value can be observed for an effect that is not meaningful or important. In fact, the larger the sample size, the smaller the minimum effect needed to produce a statistically significant p-value!. 

Still, the P-values can be used in order to answer our question, but more actions are required from us. The point I'd like to make here is that the _interpretation of statistical quantities is most of the times quite challenging_. A single reference to a high-order statistic such as the P-value does not convey the full picture. The takeaway message is that hacking can be hidden inside the technical details of the given study. This is sometimes very hard to spot even by experts, and that's why replication is a very basic ingredient of science!

--- 

## Summary

Nowadays, data is a kind of modern currency. They are extremely valuable because by studying them we can tune our decision-making process. But they can also be used to mislead, or directly support flawed claims and malicious causes. Therefore, it is more necessary than ever to educate ourselves with the basics of statistical sciences in order to be able to assess the quality of the information out there. Unfortunately, statistics is not very easy, but that's life. In my humble opinion, I think that the experts need to be alert and react to blatant _lies with data_. At least when those are used for decisions that impact the everyday life of all of us. 


## 4. [Bonus] It’s all about presentation! (★★★★★★★★★★★★★★★★★★★)

I left the best category by far as a bonus point at the end. When data can not be forged or manipulated, people resort to simply presenting them in a way that pushes their narrative. This includes tricks like zoomed-in axes, using two axes to overlay data that shouldn't be shown together, "enhanced" bar and pie charts, or directly forged data-points on plots.  

Then the question arises: Why do such an obvious manipulation? Eventually people get caught... Well, because *first impressions matter*! 

So, let's play a game: In this section I have collected a few screenshots from the news or social media. You can try yourselves to spot the visual trick used in each of those figures (hover over each image for the solution). Enjoy! 


<p align="center">
<img src="/assets/img/data-lies-post/1.png" alt= "Plot enhancement" width="50%" height="50%">
</p>

<p align="center">
<img src="/assets/img/data-lies-post/2.jpeg" alt= "Double axes, plotting absolute numbers of different populations. Need normalization." width="50%" height="50%">
</p>

<p align="center">
<img src="/assets/img/data-lies-post/3.png" alt= "Double axes, as above. After normalization the trends appear to be similar." width="50%" height="50%">
</p>

<p align="center">
<img src="/assets/img/data-lies-post/4.jpg" alt= "Time axis flip, in order to show decline of the development index." width="50%" height="50%">
</p>

<p align="center">
<img src="/assets/img/data-lies-post/5.jpg" alt= "Visual enhancement of bars here..." width="50%" height="50%">
</p>

<p align="center">
<img src="/assets/img/data-lies-post/6.jpg" alt= "No comment..." width="50%" height="50%">
</p>

<p align="center">
<img src="/assets/img/data-lies-post/7.jpeg" alt= "Bar enhancement, zoom-in to show bars of different height." width="50%" height="50%">
</p>

<p align="center">
<img src="/assets/img/data-lies-post/1.png" alt= "Plot enhancement" width="50%" height="50%">
</p>

<figure class="half" style="display:flex">
    <img style="width:400px" src="/assets/img/data-lies-post/8-1.jpg">
    <img style="width:600px" src="/assets/img/data-lies-post/8-2.jpeg">
    <figcaption>What is reported is show on the left, a real plot is shown on the right. Can you spot the difference?.</figcaption>
</figure>

<p align="center">
<img src="/assets/img/data-lies-post/doge.png" alt= "Hmmm ... Taken from doge.gov.workforce." width="50%" height="50%">
</p>
