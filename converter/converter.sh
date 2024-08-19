#!/bin/bash

function json_to_excel {
    # Use Python to convert JSON to XLSX
    python3 -c "import pandas as pd; df = pd.read_json('$1'); df.to_excel('$(basename $1 .json).xlsx', index=False, engine='openpyxl')"
}

function excel_to_json {
    # Use Python to convert XLSX to JSON
    curl -L "https://docs.google.com/spreadsheets/d/1S2pdJjb8nH7jEf2d93VWMSLS8UkUBB70Mu60lsC5Ulk/export?format=xlsx" -o product.xlsx

    python3 -c "import pandas as pd; df = pd.read_excel('product.xlsx', engine='openpyxl'); df.to_json('../products.json', orient='records', indent=2)"
    rm -rf product.xlsx
}

if [[ "$1" == "sheet" ]]; then
    json_to_excel "$2"
elif [[ "$1" == "json" ]]; then
    excel_to_json "$2"
else
    echo "Invalid command. Use 'sheet' to convert JSON to Excel and 'json' to convert Excel to JSON."
fi
