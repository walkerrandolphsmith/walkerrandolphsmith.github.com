---
title: Pair Programming
template: posts.hbt
date: 2016-10-28
description: The art of working together to make higher quality code with less effort and time.
author: Walker Randolph Smith
type: article
public: true
tags: practices
hero: default.png
---

Over the past two years I have practiced pair programming on a daily basis. Prior to this exposure I was familiar with
the concept of pair programming through reading about extreme programming. I was hopeful it would be beneficial, despite
also hearing negative reviews of the practice. Upon reflection of my experience I have determined that pair programming
is valuable and for many reasons including some I had suspicions of and some in ways I would have never expected.

## Feed back loop
The most valuable aspect of pair programming has been the fast feedback loop. As a developer we tend to produce
higher quality work at a faster rate when we quickly and regularly receive input. Test driven development is one practice
that facilitates this process. Unit tests are small in scope promoting solutions to a collection of smaller problems
be worked more quickly than one solution to a larger problem. As tests are written failures immediately occur and
the minimal implementation is written to satisfy those requirements. The integrity of the system is regularly assessed
with failing tests, In addition design decisions can be regularly assessed by exercising your implementation with various inputs.
Poor decisions and overlooked cases are exposed quickly and regularly with failing tests.
Test driven development deserses its own book and not just one article, so
how does this relate to pair programming you might be asking. In my experience pair programming creates an even tighter
feedback loop that drives implementation decisions and provides a healthy medium to challenge those decisions.
Often before a failing test can be written the pair can have iterated the feedback loops several times. When this practice is
augmented with test driven development development is more rapid and produces more quality work.

## Multiple inputs
The varying opinions, perspectives, and experiences between the pair of developers
provided benefits that I expected before practicing pair programming. Differences as trivial as lint configuration
and tabs vs spaces barely scratch the surface on how different two programmers standards can be. Adhering to one standard over the
other is far less important than the conversation that occurs when explaining and convincing one another why he or she has
chosen to adhere to that standard. The English idiom, `six of one, half dozen of the other`, does a fantastic job
illustrating how two very different implementations can arrive at a similar emergent properties. Each pair approaches
a problem with a unique perspective. Interestingly enough a given pair of developers has a different perspective than
another pair of developers. These unique perspectives expand our minds and force us to adapt and grow. Experience can be
drawn from in order to gain deeper insights into similar problems or just help avoid recreating the wheel. Given no two
developers share the same set of experiences when two developers tackle a problem their shared expereince is more likely
have a connection to the problem. Experience can also become a negative feature if one is unwilling to let go of previous
conclusions predicated on their experience. Having the pair's alternative perspective aids in breaking this unwillingness
to shed ourselves of the fear of letting go.

## Holding context
Practice can come in many forms and I specifically work on practicing the mechanics of coding. What keyboard shorts cuts
would I use in a particular situation, typing proficiency and accuracy, and design pattern strucutres to name a few.
Lacking a complete mastery of any of these creates bits of friction when solving hard problems. The context switch is very
hard to distinguish in the moment but regular occurrences of these points of friction add up and take away from your mental
capacity that is needed for problem solving. Your pair is your keeper of the context and this a magical side effect of
pair programming. As one pair performs the mechanical actions of programming that can detract from problem solving, the
other pair is available to consider the problem domain free of impedance. I have found the simple act of
navigating a file can create an overhead that requires me to juggle remembering bits of information that are
merely stepping stones to understanding the solution. As a pair we can lean on one another's mental facilties while
one pair acts as navigator of the code base, translating thoughts into code, the other can navigate the proposed solution,
instructing what direction the implementation should take. I tend to apply these roles loosely to avoid the pair not
alternating roles or creative input not being provided from both parties.

## Getting and giving
Pair programming is a prime opportunity to acquire a mentor and mentee simultaneously. Cultivating a relationship of open
transfer of knowledge has increased my understanding, empathy, and love for the software development field more than
almost any other experience. Mentorship forces one to understand concepts at a deeper level in order to not only apply
the concept but convey it to another person. The student will undoublty have questions you did not consider and
address aspects of the subject matter you superficially understand. As the student you become exposed to ideas and concepts
you were not previously aware existed. I have found learning a skill from another developer allows me to master the skill
more quickly with a higher likelihood of making a connection to its potential application in code. The student and
teacher roles are not fixed between the pair. One developer may be a master in one subject matter and a novice
in another while his or her pair has complementing skill sets. Lastly the student teacher relationship formed between the pair
is a critical factor in the cultivating a workplace of open ideas and open sharing of knowledge.

## The little things
One aspect of pairing I did not expect is the frequency of skills I acquire that become second nature. Sometimes its the
little things that matter. For instance, learning how create multiple cursors in my IDE of choice or using a shorthand when
checking out branches in git like `git co -`. Often times it becomes things I will commit to memory over time, however
it can also manifest as learning about a new tech blog to read or which mechanical keyboard is awesome. I try to
learn at least one thing from my pair everyday and often times it is the little things that are taught.

