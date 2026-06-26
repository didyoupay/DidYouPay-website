# Supported Locations Data

`locations-web.json` is the authoritative source for supported locations displayed on the Did You Pay? website. It contains only the website-facing information required to identify and group each location.

## Adding a Location

Add locations inside the appropriate category object using this structure:

```json
{
  "categories": [
    {
      "category": "Airports",
      "locations": [
        {
          "name": "Example Location"
        }
      ]
    }
  ]
}
```

Each category object must contain:

- `category`: the public category heading shown on the website.
- `locations`: the list of public location names shown under that heading.

Each location object must contain only:

- `name`: the public location name shown on the website.

The Supported Locations page displays categories and locations in the order provided by `locations-web.json`.

## Data Boundaries

Only website-facing location information belongs in `locations-web.json`. Do not add coordinates, geofence information, radius values, internal IDs, payment instructions, URLs or app-specific metadata.

The example record above demonstrates the schema only. Add and maintain all live location names exclusively in `locations-web.json`.
