#!/bin/bash
if ls products.json
then
rm products.json
fi
curl -s -L "https://docs.google.com/spreadsheets/d/1S2pdJjb8nH7jEf2d93VWMSLS8UkUBB70Mu60lsC5Ulk/export?format=xlsx" -o product.xlsx
python3 -c "import pandas as pd; df = pd.read_excel('product.xlsx', engine='openpyxl'); df.to_json('products.json', orient='records', indent=2)"
rm -rf product.xlsx
echo "Live List Updated at $(date)"