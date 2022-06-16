from datetime import datetime

import numpy

from core.tango_data import TangoData


def main():
    data = TangoData()
    print(data.min_max_date())


if __name__ == "__main__":
    main()
