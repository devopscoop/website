# Style Guide

## Overview

Fighting about style is lame. Wear the same outfit every day. Steve Jobs knew what was up, LOL.

## We Follow These Style Guides

Markdown
* https://cirosantilli.com/markdown-style-guide/ (This one is more thoughtful, thorough, and newer than the Google guide here: https://google.github.io/styleguide/docguide/style.html)

Shell
* https://github.com/google/styleguide/blob/gh-pages/shellguide.md

Terraform
* https://developer.hashicorp.com/terraform/language/style

## Common Themes


## Naming Conventions

This is a fun read: https://en.wikipedia.org/wiki/Naming_convention_(programming). "SCREAMING_SNAKE_CASE", "kebab-case", haha. I love this.

## Naming certain types of things

### Naming an Enterprise, Organization, or Business

We officially call ourselves devops.coop, but casually refer to ourselves as "The DevOps Cooperative". We could (should?[^1]) get our name legally protected with a registered trademark, but laws typically only function at the [State](https://en.wikipedia.org/wiki/State_(polity)) (big "S") level. If we registered the name "The DevOps Cooperative" in the United States, there's nothing to stop someone from forming an organization with the same name in Australia or Cameroon or some other State, right? But, the Domain Name System (DNS) is an authoritative, global technical solution to this. If we register devops.coop, no one else can register it. So, pick a good domain name, get it, and name your org that. Skip the lawyers fees and official paperwork! I'm sure we will eat our words as we grow and discover the error in this thinking, haha. 

### Naming everything else

1. Call it the shortest possible thing that a human would call it to unambiguously refer to it. For example, "prod" not "production", "infra" not "infrastructure team".
1. Do not include what it is in the name. Examples: "customers" not "customer_list", "Evans" not "Evans the Human", `resource "aws_route_table" "public" {}` not `resource "aws_route_table" "public_route_table" {}`, etc.




## Footnotes

[^1] We should consult a lawyer. Can someone form a legal entity with the same name as us, and try to wrest the devops.coop domain name away from us? I don't think so.
