# class: LocatorAssertions
* since: v1.17

The [LocatorAssertions] class provides assertion methods that can be used to make assertions about the [Locator] state in the tests. A new instance of [LocatorAssertions] is created by calling [`method: PlaywrightAssertions.expectLocator`]:

```js
import { test, expect } from '@playwright/test';

test('status becomes submitted', async ({ page }) => {
  // ...
  await page.locator('#submit-button').click();
  await expect(page.locator('.status')).toHaveText('Submitted');
});
```

```java
...
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class TestLocator {
  ...
  @Test
  void statusBecomesSubmitted() {
    ...
    page.locator("#submit-button").click();
    assertThat(page.locator(".status")).hasText("Submitted");
  }
}
```

```python async
from playwright.async_api import Page, expect

async def test_status_becomes_submitted(page: Page) -> None:
    # ..
    await page.locator("#submit-button").click()
    await expect(page.locator(".status")).to_have_text("Submitted")
```

```python sync
from playwright.sync_api import Page, expect

def test_status_becomes_submitted(page: Page) -> None:
    # ..
    page.locator("#submit-button").click()
    expect(page.locator(".status")).to_have_text("Submitted")
```

```csharp
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

public class ExampleTests : PageTest
{
    [Test]
    public async Task StatusBecomesSubmitted()
    {
        // ..
        await Page.Locator("#submit-button").ClickAsync();
        await Expect(Page.Locator(".status")).ToHaveTextAsync("Submitted");
    }
}
```

## property: LocatorAssertions.not
* since: v1.20
* langs: java, js, csharp
- returns: <[LocatorAssertions]>

Makes the assertion check for the opposite condition. For example, this code tests that the Locator doesn't contain text `"error"`:

```js
await expect(locator).not.toContainText('error');
```

```java
assertThat(locator).not().containsText("error");
```

```csharp
await Expect(locator).Not.ToContainTextAsync("error");
```

## async method: LocatorAssertions.NotToBeChecked
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeChecked`].

### option: LocatorAssertions.NotToBeChecked.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeChecked.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeDisabled
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeDisabled`].

### option: LocatorAssertions.NotToBeDisabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeDisabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEditable
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEditable`].

### option: LocatorAssertions.NotToBeEditable.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeEditable.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEmpty
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEmpty`].

### option: LocatorAssertions.NotToBeEmpty.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeEmpty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEnabled
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEnabled`].

### option: LocatorAssertions.NotToBeEnabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeEnabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeFocused
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeFocused`].

### option: LocatorAssertions.NotToBeFocused.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeFocused.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeHidden
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeHidden`].

### option: LocatorAssertions.NotToBeHidden.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeHidden.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeVisible
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeVisible`].

### option: LocatorAssertions.NotToBeVisible.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToBeVisible.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.NotToContainText
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toContainText`].

### param: LocatorAssertions.NotToContainText.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### option: LocatorAssertions.NotToContainText.ignoreCase
* since: v1.23
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression flag if specified.

### option: LocatorAssertions.NotToContainText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.NotToContainText.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToContainText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveAttribute
* since: v1.18
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAttribute#1`].

### param: LocatorAssertions.NotToHaveAttribute.name
* since: v1.18
- `name` <[string]>

Attribute name.

### param: LocatorAssertions.NotToHaveAttribute.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected attribute value.

### option: LocatorAssertions.NotToHaveAttribute.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveAttribute.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveClass
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveClass`].

### param: LocatorAssertions.NotToHaveClass.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.NotToHaveClass.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveCount
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveCount`].

### param: LocatorAssertions.NotToHaveCount.count
* since: v1.18
- `count` <[int]>

Expected count.

### option: LocatorAssertions.NotToHaveCount.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveCount.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveCSS
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveCSS`].

### param: LocatorAssertions.NotToHaveCSS.name
* since: v1.18
- `name` <[string]>

CSS property name.

### param: LocatorAssertions.NotToHaveCSS.value
* since: v1.18
- `value` <[string]|[RegExp]>

CSS property value.

### option: LocatorAssertions.NotToHaveCSS.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveCSS.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveId
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveId`].

### param: LocatorAssertions.NotToHaveId.id
* since: v1.18
- `id` <[string]|[RegExp]>

Element id.

### option: LocatorAssertions.NotToHaveId.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveId.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveJSProperty
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveJSProperty`].

### param: LocatorAssertions.NotToHaveJSProperty.name
* since: v1.18
- `name` <[string]>

Property name.

### param: LocatorAssertions.NotToHaveJSProperty.value
* since: v1.18
- `value` <[any]>

Property value.

### option: LocatorAssertions.NotToHaveJSProperty.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveJSProperty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveText
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveText`].

### param: LocatorAssertions.NotToHaveText.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### option: LocatorAssertions.NotToHaveText.ignoreCase
* since: v1.23
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression flag if specified.

### option: LocatorAssertions.NotToHaveText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.NotToHaveText.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveValue
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveValue`].

### param: LocatorAssertions.NotToHaveValue.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected value.

### option: LocatorAssertions.NotToHaveValue.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.NotToHaveValue.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveValues
* since: v1.23
* langs: python

The opposite of [`method: LocatorAssertions.toHaveValues`].

### param: LocatorAssertions.NotToHaveValues.values
* since: v1.23
- `values` <[Array]<[string]|[RegExp]>>

Expected options currently selected.

### option: LocatorAssertions.NotToHaveValues.timeout = %%-js-assertions-timeout-%%
* since: v1.23
### option: LocatorAssertions.NotToHaveValues.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.23

## async method: LocatorAssertions.toBeChecked
* since: v1.20
* langs:
  - alias-java: isChecked

Ensures the [Locator] points to a checked input.

```js
const locator = page.locator('.subscribe');
await expect(locator).toBeChecked();
```

```java
assertThat(page.locator(".subscribe")).isChecked();
```

```python async
from playwright.async_api import expect

locator = page.locator(".subscribe")
await expect(locator).to_be_checked()
```

```python sync
from playwright.sync_api import expect

locator = page.locator(".subscribe")
expect(locator).to_be_checked()
```

```csharp
var locator = Page.Locator(".subscribe");
await Expect(locator).ToBeCheckedAsync();
```

### option: LocatorAssertions.toBeChecked.checked
* since: v1.18
- `checked` <[boolean]>

### option: LocatorAssertions.toBeChecked.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeChecked.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toBeDisabled
* since: v1.20
* langs:
  - alias-java: isDisabled

Ensures the [Locator] points to a disabled element. Element is disabled if it has "disabled" attribute
or is disabled via ['aria-disabled'](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled).
Note that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup`
can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored
by the browser.

```js
const locator = page.locator('button.submit');
await expect(locator).toBeDisabled();
```

```java
assertThat(page.locator("button.submit")).isDisabled();
```

```python async
from playwright.async_api import expect

locator = page.locator("button.submit")
await expect(locator).to_be_disabled()
```

```python sync
from playwright.sync_api import expect

locator = page.locator("button.submit")
expect(locator).to_be_disabled()
```

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).ToBeDisabledAsync();
```

### option: LocatorAssertions.toBeDisabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeDisabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toBeEditable
* since: v1.20
* langs:
  - alias-java: isEditable

Ensures the [Locator] points to an editable element.

```js
const locator = page.locator('input');
await expect(locator).toBeEditable();
```

```java
assertThat(page.locator("input")).isEditable();
```

```python async
from playwright.async_api import expect

locator = page.locator(".input")
await expect(locator).to_be_editable()
```

```python sync
from playwright.sync_api import expect

locator = page.locator(".input")
expect(locator).to_be_editable()
```

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToBeEditableAsync();
```

### option: LocatorAssertions.toBeEditable.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeEditable.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toBeEmpty
* since: v1.20
* langs:
  - alias-java: isEmpty

Ensures the [Locator] points to an empty editable element or to a DOM node that has no text.

```js
const locator = page.locator('div.warning');
await expect(locator).toBeEmpty();
```

```java
assertThat(page.locator("div.warning")).isEmpty();
```

```python async
from playwright.async_api import expect

locator = page.locator("div.warning")
await expect(locator).to_be_empty()
```

```python sync
from playwright.sync_api import expect

locator = page.locator("div.warning")
expect(locator).to_be_empty()
```

```csharp
var locator = Page.Locator("div.warning");
await Expect(locator).ToBeEmptyAsync();
```

### option: LocatorAssertions.toBeEmpty.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeEmpty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toBeEnabled
* since: v1.20
* langs:
  - alias-java: isEnabled

Ensures the [Locator] points to an enabled element.

```js
const locator = page.locator('button.submit');
await expect(locator).toBeEnabled();
```

```java
assertThat(page.locator("button.submit")).isEnabled();
```

```python async
from playwright.async_api import expect

locator = page.locator("button.submit")
await expect(locator).to_be_enabled()
```

```python sync
from playwright.sync_api import expect

locator = page.locator("button.submit")
expect(locator).to_be_enabled()
```

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).toBeEnabledAsync();
```

### option: LocatorAssertions.toBeEnabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeEnabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toBeFocused
* since: v1.20
* langs:
  - alias-java: isFocused

Ensures the [Locator] points to a focused DOM node.

```js
const locator = page.locator('input');
await expect(locator).toBeFocused();
```

```java
assertThat(page.locator("input")).isFocused();
```

```python async
from playwright.async_api import expect

locator = page.locator('input')
await expect(locator).to_be_focused()
```

```python sync
from playwright.sync_api import expect

locator = page.locator('input')
expect(locator).to_be_focused()
```

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToBeFocusedAsync();
```

### option: LocatorAssertions.toBeFocused.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeFocused.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toBeHidden
* since: v1.20
* langs:
  - alias-java: isHidden

Ensures the [Locator] points to a hidden DOM node, which is the opposite of [visible](./actionability.md#visible).

```js
const locator = page.locator('.my-element');
await expect(locator).toBeHidden();
```

```java
assertThat(page.locator(".my-element")).isHidden();
```

```python async
from playwright.async_api import expect

locator = page.locator('.my-element')
await expect(locator).to_be_hidden()
```

```python sync
from playwright.sync_api import expect

locator = page.locator('.my-element')
expect(locator).to_be_hidden()
```

```csharp
var locator = Page.Locator(".my-element");
await Expect(locator).ToBeHiddenAsync();
```

### option: LocatorAssertions.toBeHidden.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeHidden.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toBeVisible
* since: v1.20
* langs:
  - alias-java: isVisible

Ensures the [Locator] points to a [visible](./actionability.md#visible) DOM node.

```js
const locator = page.locator('.my-element');
await expect(locator).toBeVisible();
```

```java
assertThat(page.locator(".my-element")).isVisible();
```

```python async
from playwright.async_api import expect

locator = page.locator('.my-element')
await expect(locator).to_be_visible()
```

```python sync
from playwright.sync_api import expect

locator = page.locator('.my-element')
expect(locator).to_be_visible()
```

```csharp
var locator = Page.Locator(".my-element");
await Expect(locator).ToBeVisibleAsync();
```

### option: LocatorAssertions.toBeVisible.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toBeVisible.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toContainText
* since: v1.20
* langs:
  - alias-java: containsText

Ensures the [Locator] points to an element that contains the given text. You can use regular expressions for the value as well.

```js
const locator = page.locator('.title');
await expect(locator).toContainText('substring');
await expect(locator).toContainText(/\d messages/);
```

```java
assertThat(page.locator(".title")).containsText("substring");
```

```python async
import re
from playwright.async_api import expect

locator = page.locator('.title')
await expect(locator).to_contain_text("substring")
await expect(locator).to_contain_text(re.compile(r"\d messages"))
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator('.title')
expect(locator).to_contain_text("substring")
expect(locator).to_contain_text(re.compile(r"\d messages"))
```

```csharp
var locator = Page.Locator(".title");
await Expect(locator).ToContainTextAsync("substring");
await Expect(locator).ToContainTextAsync(new Regex("\\d messages"));
```

If you pass an array as an expected value, the expectations are:
1. Locator resolves to a list of elements.
1. Elements from a **subset** of this list contain text from the expected array, respectively.
1. The matching subset of elements has the same order as the expected array.
1. Each text value from the expected array is matched by some element from the list.

For example, consider the following list:
```html
<ul>
  <li>Item Text 1</li>
  <li>Item Text 2</li>
  <li>Item Text 3</li>
</ul>
```

Let's see how we can use the assertion:

```js
// ✓ Contains the right items in the right order
await expect(page.locator('ul > li')).toContainText(['Text 1', 'Text 3']);

// ✖ Wrong order
await expect(page.locator('ul > li')).toContainText(['Text 3', 'Text 2']);

// ✖ No item contains this text
await expect(page.locator('ul > li')).toContainText(['Some 33']);

// ✖ Locator points to the outer list element, not to the list items
await expect(page.locator('ul')).toContainText(['Text 3']);
```

```java
// ✓ Contains the right items in the right order
assertThat(page.locator("ul > li")).containsText(new String[] {"Text 1", "Text 3", "Text 4"});

// ✖ Wrong order
assertThat(page.locator("ul > li")).containsText(new String[] {"Text 3", "Text 2"});

// ✖ No item contains this text
assertThat(page.locator("ul > li")).containsText(new String[] {"Some 33"});

// ✖ Locator points to the outer list element, not to the list items
assertThat(page.locator("ul")).containsText(new String[] {"Text 3"});
```

```python async
from playwright.async_api import expect

# ✓ Contains the right items in the right order
await expect(page.locator("ul > li")).to_contain_text(["Text 1", "Text 3", "Text 4"])

# ✖ Wrong order
await expect(page.locator("ul > li")).to_contain_text(["Text 3", "Text 2"])

# ✖ No item contains this text
await expect(page.locator("ul > li")).to_contain_text(["Some 33"])

# ✖ Locator points to the outer list element, not to the list items
await expect(page.locator("ul")).to_contain_text(["Text 3"])
```

```python sync
from playwright.sync_api import expect

# ✓ Contains the right items in the right order
expect(page.locator("ul > li")).to_contain_text(["Text 1", "Text 3", "Text 4"])

# ✖ Wrong order
expect(page.locator("ul > li")).to_contain_text(["Text 3", "Text 2"])

# ✖ No item contains this text
expect(page.locator("ul > li")).to_contain_text(["Some 33"])

# ✖ Locator points to the outer list element, not to the list items
expect(page.locator("ul")).to_contain_text(["Text 3"])
```

```csharp
// ✓ Contains the right items in the right order
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Text 1", "Text 3", "Text 4"});

// ✖ Wrong order
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Text 3", "Text 2"});

// ✖ No item contains this text
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Some 33"});

// ✖ Locator points to the outer list element, not to the list items
await Expect(Page.Locator("ul")).ToContainTextAsync(new string[] {"Text 3"});
```

### param: LocatorAssertions.toContainText.expected
* since: v1.18
* langs: python, js
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### param: LocatorAssertions.toContainText.expected
* since: v1.18
* langs: java, csharp
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>>

Expected substring or RegExp or a list of those.

### option: LocatorAssertions.toContainText.ignoreCase
* since: v1.23
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression flag if specified.

### option: LocatorAssertions.toContainText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.toContainText.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toContainText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toHaveAttribute#1
* since: v1.18
* langs:
  - alias-java: hasAttribute

Ensures the [Locator] points to an element with given attribute value.

```js
const locator = page.locator('input');
// Assert attribute with given value.
await expect(locator).toHaveAttribute('type', 'text');
```

```java
assertThat(page.locator("input")).hasAttribute("type", "text");
```

```python async
from playwright.async_api import expect

locator = page.locator("input")
await expect(locator).to_have_attribute("type", "text")
```

```python sync
from playwright.sync_api import expect

locator = page.locator("input")
expect(locator).to_have_attribute("type", "text")
```

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToHaveAttributeAsync("type", "text");
```

### param: LocatorAssertions.toHaveAttribute#1.name
* since: v1.18
- `name` <[string]>

Attribute name.

### param: LocatorAssertions.toHaveAttribute#1.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected attribute value.

### option: LocatorAssertions.toHaveAttribute#1.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveAttribute#1.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveAttribute#2
* since: v1.26
* langs:
  - alias-java: hasAttribute

Ensures the [Locator] points to an element with given attribute. The method will assert attribute
presence.

```js
const locator = page.locator('input');
// Assert attribute existance.
await expect(locator).toHaveAttribute('disabled');
await expect(locator).not.toHaveAttribute('open');
```

```java
assertThat(page.locator("input")).hasAttribute("disabled");
assertThat(page.locator("input")).not().hasAttribute("open");
```

```python async
from playwright.async_api import expect

locator = page.locator("input")
await expect(locator).to_have_attribute("disabled")
await expect(locator).not_to_have_attribute("open")
```

```python sync
from playwright.sync_api import expect

locator = page.locator("input")
expect(locator).to_have_attribute("disabled")
expect(locator).not_to_have_attribute("open")
```

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToHaveAttributeAsync("disabled");
await Expect(locator).Not.ToHaveAttributeAsync("open");
```

### param: LocatorAssertions.toHaveAttribute#2.name
* since: v1.26
- `name` <[string]>

Attribute name.

### option: LocatorAssertions.toHaveAttribute#2.timeout = %%-js-assertions-timeout-%%
* since: v1.26
### option: LocatorAssertions.toHaveAttribute#2.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.26

## async method: LocatorAssertions.toHaveClass
* since: v1.20
* langs:
  - alias-java: hasClass

Ensures the [Locator] points to an element with given CSS classes. This needs to be a full match
or using a relaxed regular expression.

```html
<div class='selected row' id='component'></div>
```

```js
const locator = page.locator('#component');
await expect(locator).toHaveClass(/selected/);
await expect(locator).toHaveClass('selected row');
```

```java
assertThat(page.locator("#component")).hasClass(Pattern.compile("selected"));
assertThat(page.locator("#component")).hasClass("selected row");
```

```python async
from playwright.async_api import expect

locator = page.locator("#component")
await expect(locator).to_have_class(re.compile(r"selected"))
await expect(locator).to_have_class("selected row")
```

```python sync
from playwright.sync_api import expect

locator = page.locator("#component")
expect(locator).to_have_class(re.compile(r"selected"))
expect(locator).to_have_class("selected row")
```

```csharp
var locator = Page.Locator("#component");
await Expect(locator).ToHaveClassAsync(new Regex("selected"));
await Expect(locator).ToHaveClassAsync("selected row");
```

Note that if array is passed as an expected value, entire lists of elements can be asserted:

```js
const locator = page.locator('list > .component');
await expect(locator).toHaveClass(['component', 'component selected', 'component']);
```

```java
assertThat(page.locator("list > .component")).hasClass(new String[] {"component", "component selected", "component"});
```

```python async
from playwright.async_api import expect

locator = page.locator("list > .component")
await expect(locator).to_have_class(["component", "component selected", "component"])
```

```python sync
from playwright.sync_api import expect

locator = page.locator("list > .component")
expect(locator).to_have_class(["component", "component selected", "component"])
```

```csharp
var locator = Page.Locator("list > .component");
await Expect(locator).ToHaveClassAsync(new string[]{"component", "component selected", "component"});
```

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: python, js
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: java, csharp
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.toHaveClass.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toHaveCount
* since: v1.20
* langs:
  - alias-java: hasCount

Ensures the [Locator] resolves to an exact number of DOM nodes.

```js
const list = page.locator('list > .component');
await expect(list).toHaveCount(3);
```

```java
assertThat(page.locator("list > .component")).hasCount(3);
```

```python async
from playwright.async_api import expect

locator = page.locator("list > .component")
await expect(locator).to_have_count(3)
```

```python sync
from playwright.sync_api import expect

locator = page.locator("list > .component")
expect(locator).to_have_count(3)
```

```csharp
var locator = Page.Locator("list > .component");
await Expect(locator).ToHaveCountAsync(3);
```

### param: LocatorAssertions.toHaveCount.count
* since: v1.18
- `count` <[int]>

Expected count.

### option: LocatorAssertions.toHaveCount.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveCount.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveCSS
* since: v1.20
* langs:
  - alias-java: hasCSS

Ensures the [Locator] resolves to an element with the given computed CSS style.

```js
const locator = page.locator('button');
await expect(locator).toHaveCSS('display', 'flex');
```

```java
assertThat(page.locator("button")).hasCSS("display", "flex");
```

```python async
from playwright.async_api import expect

locator = page.locator("button")
await expect(locator).to_have_css("display", "flex")
```

```python sync
from playwright.sync_api import expect

locator = page.locator("button")
expect(locator).to_have_css("display", "flex")
```

```csharp
var locator = Page.Locator("button");
await Expect(locator).ToHaveCSSAsync("display", "flex");
```

### param: LocatorAssertions.toHaveCSS.name
* since: v1.18
- `name` <[string]>

CSS property name.

### param: LocatorAssertions.toHaveCSS.value
* since: v1.18
- `value` <[string]|[RegExp]>

CSS property value.

### option: LocatorAssertions.toHaveCSS.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveCSS.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveId
* since: v1.20
* langs:
  - alias-java: hasId

Ensures the [Locator] points to an element with the given DOM Node ID.

```js
const locator = page.locator('input');
await expect(locator).toHaveId('lastname');
```

```java
assertThat(page.locator("input")).hasId("lastname");
```

```python async
from playwright.async_api import expect

locator = page.locator("input")
await expect(locator).to_have_id("lastname")
```

```python sync
from playwright.sync_api import expect

locator = page.locator("input")
expect(locator).to_have_id("lastname")
```

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToHaveIdAsync("lastname");
```

### param: LocatorAssertions.toHaveId.id
* since: v1.18
- `id` <[string]|[RegExp]>

Element id.

### option: LocatorAssertions.toHaveId.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveId.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toHaveJSProperty
* since: v1.20
* langs:
  - alias-java: hasJSProperty

Ensures the [Locator] points to an element with given JavaScript property. Note that this property can be
of a primitive type as well as a plain serializable JavaScript object.

```js
const locator = page.locator('.component');
await expect(locator).toHaveJSProperty('loaded', true);
```

```java
assertThat(page.locator("input")).hasJSProperty("loaded", true);
```

```python async
from playwright.async_api import expect

locator = page.locator(".component")
await expect(locator).to_have_js_property("loaded", True)
```

```python sync
from playwright.sync_api import expect

locator = page.locator(".component")
expect(locator).to_have_js_property("loaded", True)
```

```csharp
var locator = Page.Locator(".component");
await Expect(locator).ToHaveJSPropertyAsync("loaded", true);
```

### param: LocatorAssertions.toHaveJSProperty.name
* since: v1.18
- `name` <[string]>

Property name.

### param: LocatorAssertions.toHaveJSProperty.value
* since: v1.18
- `value` <[any]>

Property value.

### option: LocatorAssertions.toHaveJSProperty.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveJSProperty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toHaveScreenshot#1
* since: v1.23
* langs: js

This function will wait until two consecutive locator screenshots
yield the same result, and then compare the last screenshot with the expectation.

```js
const locator = page.locator('button');
await expect(locator).toHaveScreenshot('image.png');
```

### param: LocatorAssertions.toHaveScreenshot#1.name
* since: v1.23
- `name` <[string]|[Array]<[string]>>

Snapshot name.

### option: LocatorAssertions.toHaveScreenshot#1.timeout = %%-js-assertions-timeout-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#1.animations = %%-screenshot-option-animations-default-disabled-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.caret = %%-screenshot-option-caret-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#1.mask = %%-screenshot-option-mask-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#1.omitBackground = %%-screenshot-option-omit-background-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#1.scale = %%-screenshot-option-scale-default-css-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#1.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#1.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#1.threshold = %%-assertions-threshold-%%
* since: v1.23

## async method: LocatorAssertions.toHaveScreenshot#2
* since: v1.23
* langs: js

This function will wait until two consecutive locator screenshots
yield the same result, and then compare the last screenshot with the expectation.

```js
const locator = page.locator('button');
await expect(locator).toHaveScreenshot();
```

### option: LocatorAssertions.toHaveScreenshot#2.timeout = %%-js-assertions-timeout-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#2.animations = %%-screenshot-option-animations-default-disabled-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.caret = %%-screenshot-option-caret-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#2.mask = %%-screenshot-option-mask-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#2.omitBackground = %%-screenshot-option-omit-background-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#2.scale = %%-screenshot-option-scale-default-css-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#2.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#2.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.23
### option: LocatorAssertions.toHaveScreenshot#2.threshold = %%-assertions-threshold-%%
* since: v1.23


## async method: LocatorAssertions.toHaveText
* since: v1.20
* langs:
  - alias-java: hasText

Ensures the [Locator] points to an element with the given text. You can use regular expressions for the value as well.

```js
const locator = page.locator('.title');
await expect(locator).toHaveText(/Welcome, Test User/);
await expect(locator).toHaveText(/Welcome, .*/);
```

```java
assertThat(page.locator(".title")).hasText("Welcome, Test User");
assertThat(page.locator(".title")).hasText(Pattern.compile("Welcome, .*"));
```

```python async
import re
from playwright.async_api import expect

locator = page.locator(".title")
await expect(locator).to_have_text(re.compile(r"Welcome, Test User"))
await expect(locator).to_have_text(re.compile(r"Welcome, .*"))
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator(".title")
expect(locator).to_have_text(re.compile(r"Welcome, Test User"))
expect(locator).to_have_text(re.compile(r"Welcome, .*"))
```

```csharp
var locator = Page.Locator(".title");
await Expect(locator).ToHaveTextAsync(new Regex("Welcome, Test User"));
await Expect(locator).ToHaveTextAsync(new Regex("Welcome, .*"));
```


If you pass an array as an expected value, the expectations are:
1. Locator resolves to a list of elements.
1. The number of elements equals the number of expected values in the array.
1. Elements from the list have text matching expected array values, one by one, in order.

For example, consider the following list:
```html
<ul>
  <li>Text 1</li>
  <li>Text 2</li>
  <li>Text 3</li>
</ul>
```

Let's see how we can use the assertion:

```js
// ✓ Has the right items in the right order
await expect(page.locator('ul > li')).toHaveText(['Text 1', 'Text 2', 'Text 3']);

// ✖ Wrong order
await expect(page.locator('ul > li')).toHaveText(['Text 3', 'Text 2', 'Text 1']);

// ✖ Last item does not match
await expect(page.locator('ul > li')).toHaveText(['Text 1', 'Text 2', 'Text']);

// ✖ Locator points to the outer list element, not to the list items
await expect(page.locator('ul')).toHaveText(['Text 1', 'Text 2', 'Text 3']);
```

```java
// ✓ Has the right items in the right order
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 1", "Text 2", "Text 3"});

// ✖ Wrong order
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 3", "Text 2", "Text 1"});

// ✖ Last item does not match
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 1", "Text 2", "Text"});

// ✖ Locator points to the outer list element, not to the list items
assertThat(page.locator("ul")).hasText(new String[] {"Text 1", "Text 2", "Text 3"});
```

```python async
from playwright.async_api import expect

# ✓ Has the right items in the right order
await expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text 3"])

# ✖ Wrong order
await expect(page.locator("ul > li")).to_have_text(["Text 3", "Text 2", "Text 1"])

# ✖ Last item does not match
await expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text"])

# ✖ Locator points to the outer list element, not to the list items
await expect(page.locator("ul")).to_have_text(["Text 1", "Text 2", "Text 3"])
```

```python sync
from playwright.sync_api import expect

# ✓ Has the right items in the right order
await expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text 3"])

# ✖ Wrong order
await expect(page.locator("ul > li")).to_have_text(["Text 3", "Text 2", "Text 1"])

# ✖ Last item does not match
await expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text"])

# ✖ Locator points to the outer list element, not to the list items
await expect(page.locator("ul")).to_have_text(["Text 1", "Text 2", "Text 3"])
```

```csharp
// ✓ Has the right items in the right order
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text 3"});

// ✖ Wrong order
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 3", "Text 2", "Text 1"});

// ✖ Last item does not match
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text"});

// ✖ Locator points to the outer list element, not to the list items
await Expect(Page.Locator("ul")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text 3"});
```

### param: LocatorAssertions.toHaveText.expected
* since: v1.18
* langs: python, js
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### param: LocatorAssertions.toHaveText.expected
* since: v1.18
* langs: java, csharp
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>>

Expected substring or RegExp or a list of those.

### option: LocatorAssertions.toHaveText.ignoreCase
* since: v1.23
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression flag if specified.

### option: LocatorAssertions.toHaveText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.toHaveText.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveValue
* since: v1.20
* langs:
  - alias-java: hasValue

Ensures the [Locator] points to an element with the given input value. You can use regular expressions for the value as well.

```js
const locator = page.locator('input[type=number]');
await expect(locator).toHaveValue(/[0-9]/);
```

```java
assertThat(page.locator("input[type=number]")).hasValue(Pattern.compile("[0-9]"));
```

```python async
import re
from playwright.async_api import expect

locator = page.locator("input[type=number]")
await expect(locator).to_have_value(re.compile(r"[0-9]"))
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator("input[type=number]")
expect(locator).to_have_value(re.compile(r"[0-9]"))
```

```csharp
var locator = Page.Locator("input[type=number]");
await Expect(locator).ToHaveValueAsync(new Regex("[0-9]"));
```

### param: LocatorAssertions.toHaveValue.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected value.

### option: LocatorAssertions.toHaveValue.timeout = %%-js-assertions-timeout-%%
* since: v1.18
### option: LocatorAssertions.toHaveValue.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveValues
* since: v1.23
* langs:
  - alias-java: hasValues

Ensures the [Locator] points to multi-select/combobox (i.e. a `select` with the `multiple` attribute) and the specified values are selected.

For example, given the following element:

```html
<select id="favorite-colors" multiple>
  <option value="R">Red</option>
  <option value="G">Green</option>
  <option value="B">Blue</option>
</select>
```

```js
const locator = page.locator("id=favorite-colors");
await locator.selectOption(["R", "G"]);
await expect(locator).toHaveValues([/R/, /G/]);
```

```java
page.locator("id=favorite-colors").selectOption(["R", "G"]);
assertThat(page.locator("id=favorite-colors")).hasValues(new Pattern[] { Pattern.compile("R"), Pattern.compile("G") });
```

```python async
import re
from playwright.async_api import expect

locator = page.locator("id=favorite-colors")
await locator.select_option(["R", "G"])
await expect(locator).to_have_values([re.compile(r"R"), re.compile(r"G")])
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator("id=favorite-colors")
locator.select_option(["R", "G"])
expect(locator).to_have_values([re.compile(r"R"), re.compile(r"G")])
```

```csharp
var locator = Page.Locator("id=favorite-colors");
await locator.SelectOptionAsync(new string[] { "R", "G" })
await Expect(locator).ToHaveValuesAsync(new Regex[] { new Regex("R"), new Regex("G") });
```

### param: LocatorAssertions.toHaveValues.values
* since: v1.23
* langs: python, js
- `values` <[Array]<[string]|[RegExp]>>

Expected options currently selected.

### param: LocatorAssertions.toHaveValues.values
* since: v1.23
* langs: java, csharp
- `values` <[Array]<[string]>|[Array]<[RegExp]>>

Expected options currently selected.

### option: LocatorAssertions.toHaveValues.timeout = %%-js-assertions-timeout-%%
* since: v1.23
### option: LocatorAssertions.toHaveValues.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.23