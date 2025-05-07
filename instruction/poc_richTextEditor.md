# Objective

Build a page (app/editor/page.tsx) containing a rich text editor based on the current tech stack.

## Requirement

- The page should have a rich text editor UI.
- The rich text editor can change the text format, such as bold, header, etc.
- The rich text editor can take an HTML string as input.
- The rich text editor can output the result in HTML format.
- The input HTML string contains custom HTML tags, such as `<user name="request name" traceId="" maxLength />`. The rich text editor should render these tags appropriately.
- When the user inserts the custom tag, the text editor should suggest available field IDs for selection.
- There is a place to configure the custom input.

## Implementation

- Used `draft-js` for the editor core.
- Used `@draft-js-plugins/mention` to handle custom tag suggestions when typing "@".
- Configured the editor to accept and render custom HTML tags.
- Added a mechanism to output the editor's content in HTML format.
- Added buttons to insert predefined custom tags into the editor.

## Technical stack

### Rich Editor

- draft-js
- draft-js-plugins

### Example of input

```html
<h1>Declaration of Agreement</h1>
<p>By submitting this form, I hereby declare that:</p>
<p><strong>Exporter Information</strong></p>
<ul>
  <li>
    The <strong>Exporter Name</strong> provided is:
    <user name="_exporterName" traceId="" />.
  </li>
  <li>
    The <strong>Exporter Email</strong> provided is:
    <user name="_exporterEmail" traceId="" />.
  </li>
</ul>
<p>
  I confirm that these details are accurate and belong to the authorized
  exporter.
</p>
<p><strong>Transport Details</strong></p>
<ul>
  <li>
    The selected <strong>Transport Mode</strong> is:
    <user name="_transportMode" traceId="" />.
  </li>
  <li>
    The <strong>Departure Date/Time</strong> is:
    <user name="_departureDateTime" traceId="" />.
  </li>
</ul>
<p>
  I confirm that these transport details are correct and align with the planned
  shipment.
</p>
<p><strong>Accuracy of Information</strong></p>
<ul>
  <li>
    I understand that any false or misleading information may result in the
    rejection of this request or other legal consequences.
  </li>
  <li>
    I agree to comply with all applicable laws, regulations, and guidelines
    related to this request.
  </li>
</ul>
<p><strong>Verification and Terms</strong></p>
<ul>
  <li>
    I acknowledge that the organization processing this request reserves the
    right to verify the information provided and may contact me for further
    clarification if needed.
  </li>
  <li>
    I accept the terms and conditions outlined by the organization, including
    but not limited to the privacy policy and data usage agreement.
  </li>
</ul>
```

### Example code of mention plugin

```ts
// SimpleMentionEditor.tsx
import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import editorStyles from './SimpleMentionEditor.module.css';
import mentions from './Mentions';

export default function SimpleMentionEditor(): ReactElement {
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  return (
    <div
      className={editorStyles.editor}
      onClick={() => {
        ref.current!.focus();
      }}
    >
      <Editor
        editorKey={'editor'}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
    </div>
  );
}
```

```ts
// Mentions.ts
import { MentionData } from '@draft-js-plugins/mention';

const mentions: MentionData[] = [
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://avatars0.githubusercontent.com/u/7525670?s=200&v=4',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar:
      'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
];

export default mentions;
```

```css
SimpleMentionEditor.module.css .editor {
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
}

.editor :global(.public-DraftEditor-content) {
  min-height: 140px;
}
```
