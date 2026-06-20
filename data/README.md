# Supported Locations Data

`locations.json` is the authoritative source for supported locations displayed on the Did You Pay? website. It contains only the website-facing information required to identify and group each location.

## Adding a Location

Add one JSON object for each location using this structure:

```json
{
  "name": "Example Location",
  "category": "Airport"
}
```

Each object must contain only:

- `name`: the public location name shown on the website.
- `category`: one of the allowed categories below.

Keep all records listed alphabetically by `name`.

## Allowed Categories

- `Airport`
- `Barrier-Free Car Park`
- `Toll Road`
- `Bridge`
- `Tunnel`

## Data Boundaries

Only website-facing location information belongs in `locations.json`. Do not add coordinates, geofence information, radius values, internal IDs, payment instructions, URLs or app-specific metadata.

The example record above demonstrates the schema only. Add and maintain all live location names exclusively in `locations.json`.
