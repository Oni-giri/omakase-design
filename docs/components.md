# Components

Every component exists as CSS classes (prefix `om-`, in `css/omakase.css`) and, except the phone pieces, as a typed React component in `react/`. Previews: `docs/screenshots/`, `examples/app.html`, `examples/react/DetailPage.tsx`.

Also available, new in the repo: `AppRoot`, `Shell`, `Brand`, `NavGroup`, `NavItem`, `PageHeader`, `Breadcrumb`, `Panel`, `Prop`, `StatTile`, `CommandPalette`, `Checkbox`, `Menu`, `BulkBar`, `BulkAction`, `EmptyState`, `Skeleton`, `Kbd`.

## StatusGlyph

A 14px drawn circle that fills as an issue moves forward, followed by the status in plain text: the replacement for coloured status pills.

- Classes: `om-st` plus one of `om-st-spec` (dashed), `om-st-open` (empty), `om-st-prog` (half), `om-st-review` (three quarters), `om-st-ret` (back chevron), `om-st-ok` (filled with a check).
- Colour lives only in the glyph; the text stays `ink`. Never put the glyph on a tinted background.
- The same glyph without text (`aria-hidden`) marks run steps, palette items and tab labels. When it stands alone, give the row a text label.
- Consumer provides: the status text.

```tsx
<StatusGlyph status="review">In review</StatusGlyph>
```

```html
<span class="om-st om-st-review">In review</span>
```

## Priority

Three rising bars filled by level, and a small rose square with an exclamation mark for urgent.

- Classes: `om-pri` plus `om-pri-urgent`, `om-pri-high`, `om-pri-med`, `om-pri-low`, `om-pri-none`.
- In table rows the glyph sits before the issue ID with no text; give it `role="img"` and an `aria-label` such as "High priority".
- Urgent is the only priority with colour. Do not add more coloured levels.

```tsx
<Priority level="high" />  <Priority level="urgent" showLabel />
```

```html
<span class="om-pri om-pri-high" role="img" aria-label="High priority"></span>
```

## RatioBar

A 6px bar that shows proportions, followed by the numbers in plain text. It replaces count pills and keeps working with 3 or 300 items.

- Track: `om-ratio` with a fixed width (56 to 120px). Segments: `om-r-pass` (green), `om-r-fail` (rose), `om-r-sealed` (hatched blue for hidden or sealed things). Widths are percentages and must add up to 100 or less; the rest shows the track.
- Wrap it with its text in `om-tline`. The bar is `aria-hidden`; the text carries the meaning ("Hidden 7/9", "5 public + 8 sealed").
- Uses: test counts, run results per round, milestone progress, sub-issue progress, CI jobs.
- Never stack more than three segments.

```tsx
<RatioBar segments={[{ value: 7, kind: "pass" }, { value: 2, kind: "fail" }]} label="Hidden 7 of 9" />
```

```html
<span class="om-tline"><span class="om-ratio" style="width:90px" aria-hidden="true"><span class="om-r-pass" style="width:78%"></span><span class="om-r-fail" style="width:22%"></span></span>Hidden 7 of 9</span>
```

## Mark

A 16 by 5px colour bar followed by plain text: the replacement for tags, labels and pills.

- Classes: `om-mark` plus a kind. Visibility: `om-m-all`, `om-m-sealed` (hatched, reviewer only). Severity: `om-m-block`, `om-m-adv`. Labels: `om-l-bug`, `om-l-feat`, `om-l-perf`, `om-l-sec`, `om-l-chore`.
- Text is lowercase for labels, sentence case for kinds. No background, no border, no rounded box around it.
- Up to two marks after an issue title in a row; the rest go in the issue page.

```tsx
<Mark kind="bug">bug</Mark>  <Mark color="var(--project-sky)">design</Mark>
```

```html
<span class="om-mark om-l-bug">bug</span>
```

## RoleGlyph

A 14px stroke glyph in the role's colour before the role name, plus the 8px project square.

- Roles: pen for author (`role-author`), brackets for implementer (`role-implementer`), eye for reviewer (`role-reviewer`). The SVGs are in `icons/`.
- Projects: `om-proj` with `--p` set to a project colour token.
- Agent names (impl-claude, reviewer-opus) are plain mono text, never chips.

```tsx
<ProjectLabel color="var(--project-sky)">Periscope</ProjectLabel>
```

```html
<span class="om-role"><img src="icons/role-reviewer.svg" alt="">Reviewer</span>  <span class="om-proj" style="--p:var(--project-sky)">Periscope</span>
```

## Button

36px buttons with 8px radius; 32px with `om-btn-sm`.

- `om-btn-p` (ultramarine): the one main action of a view. `om-btn-g`: everything else. `om-btn-ok` (green): Accept only. `om-btn-d`: destructive, in red text on white, never a solid red fill.
- Disabled Accept explains itself in a line of text next to it (`aria-describedby`).
- `om-btn-dashed` for actions that create something optional (Save as view).
- Labels: verb first, sentence case, say what happens ("Send back for round 4", not "Submit").

```tsx
<Button variant="primary">Approve spec</Button>  <Button size="sm" dashed>Save as view</Button>
```

```html
<button class="om-btn om-btn-p">Approve spec</button>
```

## HoldButton

A danger button you press and hold instead of confirming in a pop-up, for actions like revoking a token.

- The fill grows from the left with `om-hold-fill` over about 1.2 s; releasing early resets it.
- Support the keyboard: holding Space or Enter works the same way.
- When it completes, show a toast that says what happened and when it takes effect.

```tsx
<HoldButton onConfirm={revoke}>Hold to revoke</HoldButton>
```

```html
(needs JS: use the React component or port its 30 lines)
```

## Switch

A 34 by 20px switch for settings rules, always with a title and a one-line explanation beside it.

- `om-switch` plus `om-switch-on`; `role="switch"` and `aria-checked`.
- Rules that cannot be turned off stay visible as disabled switches with an "Always on" note, so people see the rule exists.

```tsx
<Switch checked={on} onChange={setOn} title="Run public tests on every submission" description="The implementer sees the result on its next call." />
```

```html
<button class="om-switch om-switch-on" role="switch" aria-checked="true"></button>
```

## Field

Inputs, selects and textareas share one look: 1px `line-strong` border, 8px radius, 14px text, ultramarine focus outline.

- Labels sit above the field in 13px medium, hints below in 12.5px `ink-subtle`.
- Group related fields in a two- or three-column grid inside modals.

```tsx
<Field id="t" label="Title" hint="…"><Input id="t" /></Field>
```

```html
<label class="om-label" for="t">Title</label><input id="t" class="om-fld">
```

## FilterBar

A Filter button that opens a menu of fields, and each active filter shown as a segmented condition: field, operator, value, remove.

- Conditions are bordered segments, not pills: `om-cond` with `om-cond-k`, `om-cond-op`, a value span and `om-cond-x`.
- Menus: `om-menu` with `om-menu-it` rows, each led by the glyph of what it filters.
- When a filter is active, offer "Save as view" (dashed button). Saved views appear in the sidebar.

```tsx
<FilterCondition field="Priority" op="is any of" value="Urgent, High" onRemove={clear} />  <Menu open label="Filter by" items={[…]} />
```

```html
<span class="om-cond"><span class="om-cond-k">Priority</span><span class="om-cond-op">is any of</span><span>Urgent, High</span><button class="om-cond-x" aria-label="Remove filter">×</button></span>
```

## Sidebar

A 220px glass rail on the left: logo, main pages, projects, saved views, then workspace settings pushed to the bottom.

- Rail: `om-glass` (58% white, 16px blur) over the bloomed canvas, with a hairline right border.
- Items: `om-nav`, 36px tall, 16px icon, count on the right in `om-count`. Current page: `om-nav-on` (white with a 1px ring) and `aria-current="page"`.
- Only alerts get a filled count bubble (`om-count-alert`).
- Group labels: `om-overline`, uppercase 11.5px.

```tsx
<Sidebar brand={<Brand … />}><NavGroup><NavItem active icon={…} count={9}>Issues</NavItem></NavGroup><NavGroup end label="Workspace">…</NavGroup></Sidebar>
```

```html
<nav class="om-sidebar"><div class="om-nav-group"><a class="om-nav om-nav-on" aria-current="page">…</a></div></nav>
```

## StatusTabs

The filter strip at the top of a list: white, each tab led by its status glyph, the selected tab bold with a 2px ultramarine underline and an ultramarine count.

- `om-tabs` (strip) with `om-stab` items; `om-stab-on` for the selected one; counts in `om-stab-n`.
- No grey strip background and no grey pill on the selected tab: that reads as dull.
- Hover is a faint blue wash (`accent-wash`).

```tsx
<StatusTabs value={f} onChange={setF} items={[{ key: "all", label: "All", count: 9 }, { key: "review", label: "In review", status: "review", count: 2 }]} />
```

```html
<div class="om-tabs" role="tablist"><button class="om-stab om-stab-on" role="tab" aria-selected="true">All<span class="om-stab-n">9</span></button></div>
```

## Segmented

A compact switch between two to four views of the same thing, such as "View as" roles or Needs you / Activity.

- `om-seg-wrap` with `om-seg` items; the selected one is white with a ring (`om-seg-on`).
- Use it to change a view, not to filter a list (use StatusTabs for that).

```tsx
<Segmented label="View as" value={v} onChange={setV} options={[{ key: "you", label: "You" }, { key: "impl", label: "Implementer" }]} />
```

```html
<div class="om-seg-wrap" role="radiogroup"><button class="om-seg om-seg-on" role="radio" aria-checked="true">You</button></div>
```

## Card

White card with a hairline border, 12px radius and a long soft shadow, sitting on the bloomed canvas.

- `om-card`, header `om-card-h` (14px semibold title, metadata, actions pushed right with `margin-left:auto`), body `om-card-b`.
- Inner panels inside a card (verdict box, run steps) use `om-panel` on `surface-sunken`.
- No left-border accent stripes, no coloured card backgrounds.

```tsx
<Card title="Current round" meta={…} actions={…}>…</Card>   <Card title="Issues" flush><table className="om-table">…</table></Card>
```

```html
<section class="om-card"><div class="om-card-h"><h2 class="om-card-t">Title</h2></div><div class="om-card-b">…</div></section>
```

## IssueTable

The main list: 52px rows inside a card, whole row clickable, checkbox for bulk select.

- Order inside the first cell: priority glyph, mono ID, title (500), up to two marks.
- Status as a StatusGlyph, tests as a RatioBar, round as plain text (red at the cap).
- Selected rows get `om-row-sel` (blue wash) and a white bulk-action bar floats at the bottom of the screen.
- Use `tabular-nums` for every numeric column.

```tsx
<Card flush><table className="om-table">…</table></Card> + <Checkbox /> + <BulkBar count={n} onClear={clear}><BulkAction>Priority</BulkAction></BulkBar>
```

```html
<table class="om-table">…</table>, selected row: <tr class="om-row-sel">
```

## Modal

Centered dialog, 560px wide, 16px radius, over a 38% dark scrim. Never a side sheet.

- `om-modal` with `om-modal-h`, `om-modal-b`, `om-modal-f` (Cancel then the primary action, right-aligned).
- The command palette is the same shape, 620px wide, anchored at 12% from the top.

```tsx
<Modal open={o} title="New issue" onClose={close} footer={<><Button>Cancel</Button><Button variant="primary">Create issue</Button></>}>…</Modal>
```

```html
<div class="om-overlay"><div class="om-modal" role="dialog" aria-modal="true">…</div></div>
```

## Toast

A small white floating bar at the bottom centre that confirms an action: pending with a spinner, then done with Undo.

- `om-toast`; action buttons inside use `om-toast-act` (ultramarine).
- The bulk-action bar uses the same white floating surface and position.
- Never make them dark: the system has no dark surfaces.

```tsx
<Toast state="done" action={{ label: "Undo", onClick: undo }}>HLD-31 approved.</Toast>
```

```html
<div class="om-toast-wrap"><div class="om-toast" role="status">…<button class="om-toast-act">Undo</button></div></div>
```

## InlineAlert

An error shown where it happened: red-tinted panel, icon, a bold one-line cause, a sentence on what it means, and the next actions.

- `om-alert`. Say who it goes to and why ("so it comes to you").
- Empty states use `om-empty`: dashed border, one plain sentence, optional primary action.

```tsx
<InlineAlert title="The run failed before any test ran" actions={…}>Why, and who it goes to.</InlineAlert>  <EmptyState action={…}>Nothing waiting on you.</EmptyState>
```

```html
<div class="om-alert" role="alert">…</div>  <div class="om-empty">…</div>
```

## RunSteps

A long-running job as a list of steps: done ones with a check, the current one with a spinner and a progress bar, the rest muted with an empty circle.

- `om-step`, `om-step-now`, `om-step-todo`; durations on the right in mono (`om-step-t`).
- Always show what happens at the end (cleanup), so people trust the job.

```tsx
<RunSteps steps={[{ label: "Checked out 5f3a9c1", state: "done", time: "3.4 s" }, { label: "Running tests", state: "now", progress: 66 }, { label: "Destroy the container", state: "todo" }]} />
```

```html
<ol><li class="om-step om-step-now">…</li></ol>
```

## Redaction

Striped grey bars that stand in for content a role cannot see, such as hidden tests or reviewer notes in the implementer's view.

- `om-rbar` with a varied width per line, plus a lock icon for items in a list.
- Always end with a line saying what is sealed and from whom. Never show the real text in a tooltip.

```tsx
<Redaction lines={4} note="4 notes sealed · not sent to this role." />
```

```html
<span class="om-rbar" style="width:78%"></span>
```

## ActivityFeed

One line per event that needs no action: glyph, sentence, reference, time, unread dot.

- `om-act` rows inside a card; `om-unread` is the only colour besides the glyph.
- Agent names in mono. Quotes from comments on a second line, truncated.

```tsx
<Card flush><ul><ActivityItem glyph={<StatusGlyph status="done" />} reference="CI" time="5 h ago">umbrel-act is back online</ActivityItem></ul></Card>
```

```html
<li class="om-act">…<span class="om-unread"></span></li>
```

## PhoneDock

On phones, cards get a 16px radius and actions move to a glass dock at the bottom, within thumb reach.

- `om-mcard` for cards, `om-dock` for the bottom bar, `om-mbtn` (44px) for its buttons.
- Keep one sentence above the buttons when an action is locked, saying how to unlock it.

```tsx
(compose with plain elements: om-mcard, om-dock, om-mbtn)
```

```html
<div class="om-dock"><button class="om-mbtn om-mbtn-ok">Accept</button></div>
```
