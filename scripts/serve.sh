#!/bin/bash

set -o errexit -o pipefail

source ./scripts/common.sh

# Just run Hugo.
hugo serve --buildDrafts --buildFuture --ignoreVendorPaths="github.com/zchase/pulumi-docs-react-spike/**/*" | grep -v -e 'WARN .* REF_NOT_FOUND'
