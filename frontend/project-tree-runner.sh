#!/bin/zsh
# To run it:
# ./project-tree-runner.sh

(
echo "Code to run it"
echo 'tree -a -L 10 -I "node_modules|.git|.next|dist|build|coverage" > project-tree.txt'
echo
tree -a -L 10 -I "node_modules|.git|.next|dist|build|coverage"
) > project-tree.txt