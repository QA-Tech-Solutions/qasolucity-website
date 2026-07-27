#!/bin/zsh
# To run it:
# ./project-tree-runner.sh

(
echo
tree -a -L 15 -I "node_modules|.git|.next|dist|build|coverage"
) > project-tree.txt