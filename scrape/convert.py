import os
import json

countries = {}
conv = json.loads(open("convert.json").read())
form = json.loads(open("template.json").read())
r = json.loads(open("results.json").read())
print(r)

for country in r:
    a = form.copy()
    for category in r[country]:
        for item in r[country][category]:

            try:
                key = conv[item[0]]
            except KeyError:
                continue

            val = float(item[1].replace(",", ""))

            if key == "expensive_rest":
                val /= 2

            a[key] = val
    
    countries[country.replace("+", "").lower()] = a

f = open("countries.json", "w")
f.write(json.dumps(countries, indent=3))
