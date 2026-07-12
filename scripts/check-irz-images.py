#!/usr/bin/env python3
import concurrent.futures
import json
import urllib.error
import urllib.request
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest_path = ROOT / 'data/irz-archive-manifest.json'
report_path = ROOT / 'data/irz-image-report.json'
records = json.loads(manifest_path.read_text())
urls = sorted({url for record in records for url in record.get('images', [])})

def check(url):
    parts = urllib.parse.urlsplit(url)
    encoded_url = urllib.parse.urlunsplit((parts.scheme, parts.netloc, urllib.parse.quote(urllib.parse.unquote(parts.path), safe='/'), parts.query, parts.fragment))
    request = urllib.request.Request(encoded_url, method='HEAD', headers={'User-Agent': 'arthak-archive-check/1.0'})
    try:
        with urllib.request.urlopen(request, timeout=12) as response:
            return {'url': url, 'status': response.status, 'finalUrl': response.geturl(), 'contentType': response.headers.get('content-type', '')}
    except urllib.error.HTTPError as error:
        return {'url': url, 'status': error.code, 'error': str(error)}
    except Exception as error:
        return {'url': url, 'status': 0, 'error': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=16) as executor:
    results = list(executor.map(check, urls))

report_path.write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
ok = sum(1 for result in results if 200 <= result['status'] < 400)
print(f'Images uniques: {len(results)}, accessibles: {ok}, erreurs: {len(results) - ok}')
