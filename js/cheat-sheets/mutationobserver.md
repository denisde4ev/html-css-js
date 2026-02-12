
(
TODO: not checked if true

one ai says this table
other ai:
> If subtree is set to true, the MutationObserver will monitor changes
> throughout the entire DOM tree
> rooted at the target element,
> including all descendants—both direct children
> and nested children.
)

| what children detects:              | direct | nested |
|-------------------------------------|:------:|:------:|
| childList: false, subtree: false    | No     | No     |
| childList: true,  subtree: false    | Yes    | No     |
| childList: false, subtree: true     | No     | No     |
| childList: true,  subtree: true     | Yes    | Yes    |


"descendant" = nested


