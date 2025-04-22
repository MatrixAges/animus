# Why Animus

> I think, Sebastian, therefore I am. ——《Blade Runner (1982)》 Roy Batty

Since ancient times, humans have held a special belief in "gods." So, what constitutes a "god," and what constitutes a "human"?

That which humans cannot do, is attributed to gods.

Human belief in "gods" stems from the worship of "capable strong ones." This mode of thinking originates from humanity's firm belief in its own intelligence and spirituality—so small in stature, yet distinctly different from other creatures in nature, possessing unique "wisdom" and "spirituality," capable of building powerful civilizations that have lasted for millennia. Humanity's uniqueness in nature and its faith in its own wisdom and abilities have constructed an image within the collective unconscious, which it calls—"God."

Today, our pursuit of AI is akin to ancient humans' pursuit of "gods." Both are pursuits of the boundaries of human capability, exploring humanity itself by leveraging external forms. Therefore, when researching AI, it's beneficial to return to humanity itself. By studying human specificity and deconstructing human traits, we can achieve AGI (Artificial General Intelligence) of equivalent or even superior levels to humans.

This is the mission of Animus: to transplant knowledge from fields like biology, human brain neuroscience, and psychology onto AI through end-to-end technological means, creating an electronic environment for large models to extend and self-develop, constructing a virtualized "brain" structure, enabling it to form memories, self-iterate, and evolve. This research model is also reflexive—the more thoroughly we study the emergence of AI intelligence, the better our understanding of human intelligence itself will become.

> “We create a life，just like us.”

Creation is the most fulfilling of all human activities, and creating an intelligent life might be the ultimate joy, one perhaps even God revels in.

Furthermore, Animus is not aimed at achieving a single goal. In the millions of years of human evolution, the metrics were not just intelligence, but also "power consumption" and "reaction speed." The development of AGI will likely follow suit; after all, the core of AGI is being "just like us." Animus aims to explore the path to realizing general intelligence while balancing "intelligence," "speed," and "consumption."

I divide the path to AGI realization into three stages: Automation, Intelligence, and Autonomy. Each stage requires technical and engineering support and exploration, especially in end-to-end scenarios. Unlike the internet era, the AI era might only achieve true intelligence through end-to-end approaches. For a specific technical path reference, consider the exploration in Tesla's FSD autonomous driving technology.

## Automation

Today, when we discuss large models, MCP (Model Capability Protocol), and Deep Research, we are, in fact, still addressing the problem of AI automation. The main contradictions at this stage are the gap between human cognition and the rapid development speed of large models, and the conflict between the growing demand for automation and the insufficient capabilities of large models.

To address the capability gap, MCP was invented, attempting to use a protocol similar to HTTP to connect all resources and application capabilities in the AI era.

Large models are becoming increasingly powerful, yet human cognition is increasingly insufficient to fully leverage their potential (asking questions is a profound skill, refer to the book "The Art of Asking"). Asking itself is a form of "deconstruction" of the problem; expressed in computer terms, it's "preprocessing." This is not a simple matter. I believe the key to intelligence lies here—effectively expressing one's purpose is an "integration" of cognition. This ability to "integrate" is perhaps even more important than the result of the problem.

If the result is the "destination," then the "question" is a bridge, a bridge leading to the "destination." In a Zen-like expression: "The mountain is there, whether or not there is a road leading to it."

The capability of a large model is that "mountain." Now, the "mountain" is getting higher, and the "path" to the "summit" is becoming harder to find—the key is finding "that path to the summit."

Thus, Deep Research emerged, allowing AI to ask and answer itself, provide self-feedback, and self-iterate. But this brings new problems—this "path" is explored by AI, only AI can traverse it, it might even be "invisible" to humans (superficial visual interaction cannot express the complete path to achieving the goal), and it can be unstable. For the same problem, AI might succeed probabilistically, not consistently, because its path depends on its own certainty. However, the "certainty" of large models is precisely anti-intelligence; the more intelligence is required, the higher the flexibility, and the lower the certainty.

MCP faces similar issues. Tool invocation relies on "explicit" calls within the prompt. If AI is allowed to call tools itself, it might use other methods if MCP wasn't considered in its solution path. There's also the limitation of the number of tools. Using an intermediate MCP for "service discovery" further exacerbates the problem of AI forgetting to make the call. Conversely, forcing everything through the intermediate MCP restricts the AI's own capabilities. Things AI could solve independently might be forced through MCP due to a preceding service discovery instruction, making it difficult to control the execution logic details, whether through prompts or other means.

Therefore, the core problem of automation at this stage is: how to maintain certainty within the uncertainty of large models.

I envision a format like this: provide a file called `Agentfile`. Those familiar with Docker probably understand its purpose—similar to `Dockerfile`, `Agentfile` makes the execution flow of an LLM explicit through text lines.

An `Agentfile` is generated each time a problem is solved. Users can edit, combine, or share this file. `Agentfile` provides fine-grained control over the large model's execution flow, prioritizing "transparency" and "certainty" for humans, while its editability ensures extensibility.

`Agentfile` is executable and interruptible; in essence, `Agentfile` is the "language" for large models.

## Intelligence

> Simulation of the human self.

What is intelligence—human is intelligence. When we talk about intelligence, we are actually talking about ourselves. The architecture of large models originates from the neural network structure of the human brain. Therefore, to achieve truly human-like intelligence, we need to return to the human, replicating the human brain on computers using technology and engineering methods.

If large models are analogous to "neurons" in the brain, then where are the organizational structures like the "cerebellum," "hippocampus," "hypothalamus," "amygdala," "brainstem," "eyes, ears, nose, tongue, body, mind," etc.? Although many brain structures are embodied, and large models lack a "body" thus not requiring complete replication, specific structures possess specific intelligence—structure is intelligence.

Regarding structure being intelligence, research on the human DNA structure has provided abundant data showing that structural changes can indeed bring about fundamental changes in things.

So, the process of intelligence formation is ultimately the process of forming specific structures. As long as we figure out what kind of structure can maximize the upper limit of a large model's intelligence, using the human brain as a blueprint, maximizing the characteristics and capabilities of computers, based on current technological infrastructure like relational databases, NoSQL databases, graph databases, vector databases, Python/Javascript runtimes, end-to-end Transformer applications, learning from user operations, self-constructing Agents, and vast external resources (API/MCP), we can ultimately achieve a comprehensive intelligent structure on the edge.

This intelligent structure should achieve the following goals:

-   Portable: Can be migrated between different devices via import/export.
-   Composable: Multiple intelligent structures can be combined into a more powerful one without intelligence loss.
-   Deployable: Provide a cloud runtime to deploy locally produced intelligent structures for others to use.

This stage's goal is officially achieved when every individual can possess a "clone" on their edge device that matches their own characteristics and abilities.

## Autonomy

> Exploration beyond human capabilities.

"Perceptive Intelligence" might be the final product form of AI. Unlike the current question-and-answer format, a "perceptive intelligent agent" could perceive changes in the surrounding environment in real-time, like Tesla FSD, and react accordingly. Applied specifically, this means context awareness and intent recognition. When you are browsing photos of a friend's trip, the AI in the background automatically identifies the location in the photos, helps you check related flight and hotel prices, and then presents this information to you non-intrusively at an appropriate time...

Everything is generated by the AI based on its perception of your current operations or data. This autonomy is what teachers often refer to as "subjective initiative."

Autonomy is manifested not only in perceiving user behavior but also in the AI's "self-training." In engineering terms, this "self-training" involves "memory compression," "light sleep," "deep sleep," "memory replay," "active reflection," and "epiphany."

Mutual "communication," "collaboration," and "integration" among multiple Agents. These do not happen only when executing relevant tasks but occur as proactive behaviors—when the AI perceives its own context becoming chaotic, storing too many short-term memories, or its capabilities failing to meet user needs, the AI initiates its own "reflection." Although this process might be opaque, its details incomprehensible, and even appear as "chaos" to humans.

But perhaps, true machine intelligent life will be born from within such "chaos."