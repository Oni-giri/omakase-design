// A detail page built from the React components: breadcrumb, header, action bar, cards, run steps, verdict, right rail.
// Copy react/ into your app, import '…/css/omakase.css' once, then compose like this.
import * as React from 'react';
import {
  AppRoot, Shell, Sidebar, Brand, NavGroup, NavItem, PageHeader, Breadcrumb, Card, Panel, Prop,
  StatusGlyph, Priority, Mark, RatioBar, Button, Segmented, RunSteps, Textarea, Field, InlineAlert,
  Toast, ProjectLabel, StatTile, ActivityItem, HoldButton, IconIssues, IconBoard, IconAccess,
} from '../../react';

export function DetailPage() {
  const [view, setView] = React.useState<'you' | 'impl' | 'rev'>('you');
  const [toast, setToast] = React.useState<'' | 'pending' | 'done'>('');
  const accept = () => { setToast('pending'); setTimeout(() => setToast('done'), 1200); };

  return (
    <AppRoot>
      <Shell
        sidebar={
          <Sidebar brand={<Brand mark={<img src="../../logos/holdout-mark.svg" width={30} height={30} alt="" />} name="Holdout" sub="Personal workspace" />}>
            <NavGroup>
              <NavItem href="#" active icon={<IconIssues />} count={9}>Issues</NavItem>
              <NavItem href="#" icon={<IconBoard />}>Board</NavItem>
            </NavGroup>
            <NavGroup label="Projects">
              <NavItem href="#"><ProjectLabel color="var(--project-sky)">Periscope</ProjectLabel></NavItem>
            </NavGroup>
            <NavGroup end label="Workspace">
              <NavItem href="#" icon={<IconAccess />} count={2} alert>Access &amp; log</NavItem>
            </NavGroup>
          </Sidebar>
        }
        rail={
          <>
            <div>
              <h2 className="om-section-t" style={{ fontSize: 13, marginBottom: 6 }}>Properties</h2>
              <Prop k="Status"><StatusGlyph status="review">In review</StatusGlyph></Prop>
              <Prop k="Priority"><Priority level="urgent" showLabel /></Prop>
              <Prop k="Labels"><Mark kind="bug">bug</Mark></Prop>
              <Prop k="Milestone"><RatioBar width={40} segments={[{ value: 6, kind: 'pass' }]} total={11} label="M3 · Dec 12" /></Prop>
              <Prop k="Implementer"><span className="om-mono">impl-claude</span></Prop>
            </div>
            <StatTile label="Blocking findings" value="5 → 2 → 0" detail="Comes back to you if they stop dropping." />
          </>
        }
      >
        <PageHeader
          large
          breadcrumb={<Breadcrumb items={[{ label: 'Issues', href: '#' }, { label: 'Periscope', href: '#' }, { label: 'HLD-30' }]} />}
          title="Retry with backoff when RPC returns 429"
          actions={<Segmented label="View as" value={view} onChange={setView} options={[{ key: 'you', label: 'You' }, { key: 'impl', label: 'Implementer' }, { key: 'rev', label: 'Reviewer' }]} />}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-subtle)' }}>
            <StatusGlyph status="review">In review</StatusGlyph><Priority level="urgent" showLabel /><Mark kind="bug">bug</Mark><span>Round 3 of 6</span>
          </div>
        </PageHeader>

        <Card title="Current round · Round 3" meta={<span className="om-mono" style={{ fontSize: 12.5 }}>impl-claude</span>} actions={<Button size="sm">View job #482</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <RatioBar segments={[{ value: 6, kind: 'pass' }]} label="Public 6 of 6" />
              <RatioBar segments={[{ value: 7, kind: 'pass' }, { value: 2, kind: 'fail' }]} label="Hidden 7 of 9" />
            </div>
            <RunSteps steps={[
              { label: 'Job #482 queued on umbrel-act', state: 'done', time: '2.1 s' },
              { label: 'Checked out 5f3a9c1 in a fresh container', state: 'done', time: '3.4 s' },
              { label: 'Running tests · 6 of 9 hidden done', state: 'now', time: '1 min 31 s', progress: 66 },
              { label: 'Post results', state: 'todo' },
              { label: 'Destroy the container', state: 'todo' },
            ]} />
            <Panel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Field id="fb" label="New findings" hint="Describe behaviour, never name a hidden test."><Textarea id="fb" rows={2} placeholder="One finding per line" /></Field>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
                  <span className="om-hint" style={{ marginRight: 'auto' }}>All tests passed and no blocking findings are open.</span>
                  <Button>Send back for round 4</Button>
                  <Button variant="success" onClick={accept}>Accept</Button>
                </div>
              </div>
            </Panel>
          </div>
        </Card>

        <InlineAlert title="A hidden test could not be loaded" actions={<><Button size="sm">Retry run</Button><Button size="sm">Open run output</Button></>}>
          This is a problem with the tests, not the code, so it comes to you instead of the implementer.
        </InlineAlert>

        <Card title="Activity" flush>
          <ul style={{ listStyle: 'none', margin: 0, padding: '4px 0' }}>
            <ActivityItem glyph={<StatusGlyph status="returned" />} reference="HLD-29" time="1 h ago" unread>CI job #481 failed 2 hidden tests; sent to the reviewer</ActivityItem>
            <ActivityItem glyph={<StatusGlyph status="done" />} reference="CI" time="5 h ago"><span className="om-mono">umbrel-act</span> is back online</ActivityItem>
          </ul>
        </Card>

        <div><HoldButton onConfirm={() => setToast('done')}>Hold to close issue</HoldButton></div>
      </Shell>
      {toast && <Toast state={toast} action={toast === 'done' ? { label: 'Undo', onClick: () => setToast('') } : undefined}>{toast === 'pending' ? 'Accepting HLD-30…' : 'HLD-30 accepted.'}</Toast>}
    </AppRoot>
  );
}
