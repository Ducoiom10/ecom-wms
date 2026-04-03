$target = 'C:\laragon\www\ecom-wms\storefront-pwa'

if (Test-Path $target) {
    Remove-Item $target -Recurse -Force -ErrorAction SilentlyContinue
}