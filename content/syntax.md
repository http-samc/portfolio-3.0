# Markdown Syntax Guide 💯

## Headings

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Paragraph
\tXerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

## Blockquotes

### Without attribution:
> Hello, World!

### With attribution:
> Hello, World! <cite>&mdash; John Doe</cite>

## Tables & Styling

| Key | Value |
| --- | --- |
| italics | *italics* |
| bold | **bold** |
| link | [link](https://github.com/http-samc) |
| code | `code` |
| normal text | normal text |

## Code Blocks

```Python
import time

def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

if __name__ == "__main__":
    numTerms: int = 100
    start: float = time.time()
    print(f"Starting fibonacci({numTerms})!")
    val: int = fibonacci(numTerms)
    end: float = time.time() - start
    print(f"Finished in {round(end, 4)} second(s) with value {val})
```

## Lists

### Ordered List:
1. First
2. Second
3. Third

### Unordered List:
- First
- Second
- Third

### Nested List:
- First
    - First Nested
    - Second Nested
    - Third Nested
- Second
- Third

### Images
![favicon](/assets/img/favicon.png)