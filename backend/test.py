import json
import unicodedata
from datetime import datetime

import numpy
import pandas

from core.tango_data import TangoData


def decode_unicode(name: str):
    return unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("utf-8")


def main():
    df = pandas.read_csv("./data/overview_data.csv")
    res: dict[str, str] = {}
    for i, row in df.iterrows():
        row_dict = row.to_dict()
        row_dict_cleaned = {}
        for k, v in row_dict.items():
            v_cleaned = v
            if type(v) == float:
                v_cleaned = " "
            v_cleaned = decode_unicode(v_cleaned)
            row_dict[k] = v_cleaned
        del row_dict["search_name"]
        res[row["search_name"]] = row_dict

    with open("./data/overview_data.json", "wt") as wf:
        json.dump(res, wf)


if __name__ == "__main__":
    main()
