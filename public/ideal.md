# Ideal Infra

## Phase 1

- One cluster on whatever CSP you're most comfortable with
- Single AZ to save cost
- One cluster for multiple environments, to save cost.

## Phase 2

???

## Phase 3

- Three clusters spread across the planet for redundancy and availability
  - One self-hosted
  - One on Digital Ocean in a region in a timezone approximately +8h away
  - One on another cloud provider in a region in a timezone approximately +8h away
- Do not use multiple availability zones in any region, because we already have global availability, and we shouldn't pay for redundancy we don't need. Using a single AZ also means you don't have to add nodes to your nodegroup in groups of 3 to ensure that storage is available.
- Configure DNS to use geolocation routing.
- Use distributed databases (maybe something like TiDB?) or setup eventually consistent global distribution? I am not a DBA.
- One set of clusters per environment, or per project per env for larger orgs, to PoLP.
