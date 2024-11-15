---
title: Writing code for people, not computers
description: Less is not always more.
date: 2024-11-15T20:31:00.000+08:00
schedule:
hidden: false
tags:
  - typescript
  - principles
  - en-version
---

I recently came across an interesting technical discussion: "Good code doesn't need comments." This claim seems reasonable at first glance, but my practical experience tells me it's not that simple. So I'd like to take this opportunity to share some principles I believe are important in writing good code.

## Why Do We Need Comments?

In an ideal world, every line of code should be self-explanatory. But the real-world software development is often filled with special requirements and business logic that may not be so intuitive. For example:

- A specific calculation logic may be to accommodate a particular business rule
- An implementation that seems to take a roundabout approach may be to handle edge cases
- A temporary solution may be due to system constraints

In these situations, appropriate comments can not only help other developers understand the intent of the code, but more importantly, they can help your "future self" recall the rationale behind the original decisions.

## The True Value of Code Review

Many people think code review is primarily about finding errors in the code. However, the definition of "error" can vary depending on the context. No one can write perfect code. Past interview experiences also suggest some people hold the view that **only senior engineers can do proper code reviews**.

But I believe the most important function of code review is "information synchronization 🔁". Through the code review process, team members can:

- Share knowledge about the current system state
- Align on the understanding of business logic
- Prevent potential misunderstandings and rework
- Establish a shared team awareness

Therefore, even seemingly simple changes are worth going through a thorough code review process. If this information synchronization step is missing, it's easy for knowledge gaps to form between different developers working on similar modifications, leading to unnecessary issues.

Let me share a real-life example: In a project, we had a dropdown menu that was originally maintained and translated by the frontend team. Later, due to a requirement change, the options were to be provided dynamically by a backend API. This change rendered the related translations in the frontend dictionary file obsolete. However, due to tight timelines, the developer who made the change did not remove these unused translations. And at the time, only I had reviewed that PR, while others may have deemed the requirement simple or the changes minor, and so did not scrutinize it closely.

Soon after, another frontend engineer was assigned a ticket to "adjust some text in the menu." Without being informed of the previous change, this colleague naturally modified the text in the dictionary files across different languages and submitted a PR. This change not only had no actual effect (since the text was now provided by the backend), but even worse, it revealed that the modifier had not even verified if the changes matched the actual UI. What's the point of merging such a PR?

## TypeScript: Better Development Experience

Speaking of improving code readability, TypeScript is a must-mention for me. Even though I'm not always the most familiar with advanced features like generics, TypeScript's type system has significantly enhanced my own development experience.

In JavaScript, to understand the possible values of a property, you often need to scour the entire codebase. But in TypeScript:

- The type definitions clearly communicate the possible values
- You can quickly trace the origin of a type
- IDE support makes development more efficient

In our development journey, we've probably all seen backend APIs returning status codes like this:

```jsx
status: 0 // inactive
status: 1 // active
status: 2 // deleted
```

Without a type system, to understand the possible values of this `status` property, we need to:

1. Scan through all the places where this property is used
2. Check the API documentation (if available)
3. Directly ask the backend team

But with TypeScript, we can define the known situations upfront, turning the numeric values into a meaningful enum to improve readability:

```jsx
enum UserStatus {
  Inactive = 0,
  Active = 1,
  Deleted = 2,
}
```

## Conclusion

We need to recognize that the primary readers of our code are **humans**, not computers. Computers only care about the correctness of the instructions, but humans need to understand the logic and intent behind the code. That's why we should avoid meaningless naming like `aa`, `bb_1` - the few seconds saved on typing may cost the future reader many times more to comprehend the purpose of the code.

Many developers say, "This is my personal project, I don't need to be that meticulous." But the truth is, we're always collaborating with our "future selves." Six months later, the "you" who comes back to modify the code is essentially another developer. When you have to change code you wrote half a year ago, you'll be grateful to your former self who left clear comments.

TypeScript certainly brings us a better development experience, but that doesn't mean we can completely abandon comments. The type system tells us the structure and constraints of the data, but it can't explain the underlying business logic. TypeScript and comments should be complementary - one tells us the "what", the other tells us the "why". Especially in projects without TypeScript, clear comments become even more important.

The code review process should not be reduced to just finding errors in the code. It's an important channel for knowledge sharing, a critical moment for the team to synchronize information. Even tiny changes can hide significant business logic updates. Through a thorough review process, we're not just examining the code, but also establishing a shared team awareness.

In the end, software development is an art of communication. Good code should be like a well-written article - logical, structured, and allowing readers to easily grasp the author's intent. Whether it's variable naming, type definitions, code comments, or the review process, these are not extra burdens, but necessary elements for writing code that is meant to be read by humans, not just executed by machines.

> for zhTw version: <a href="/thoughts/coding-for-people">寫程式不只是對機器說話</a>
