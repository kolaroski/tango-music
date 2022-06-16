import pandas
data = pandas.read_csv("all_orquestras_data.csv")

new_dates = []
for val in data['Date']:
    year, month, day = val.split('-')
    if month == "00":
        month = "01"
    if day == "00":
        day = "01"
    new_val = "-".join([year, month, day])
    new_dates.append(new_val)

data['Date'] = new_dates
data.to_csv("all_orquestras_data_new_dates.csv", index=False)
    