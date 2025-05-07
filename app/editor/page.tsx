'use client';

import createMentionPlugin from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import { Container, Stack } from '@mui/material';
import {
  CompositeDecorator,
  ContentState,
  EditorState,
  Modifier,
  convertFromHTML,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js for client-side rendering
import { useEffect, useMemo, useRef, useState } from 'react';

// Example HTML input
const exampleHtmlInput = `
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
`;

const mentions = [
  { name: '_exporterName' },
  { name: '_exporterEmail' },
  { name: '_transportMode' },
  { name: '_departureDateTime' },
];

// Define a strategy to find <user/> tags in the content
const userTagStrategy = (contentBlock, callback, contentState) => {
  const text = contentBlock.getText();
  const regex = /<user name="([^"]+)" traceId="([^"]*)" \/>/g;
  let matchArr;
  while ((matchArr = regex.exec(text)) !== null) {
    callback(matchArr.index, matchArr.index + matchArr[0].length);
  }
};

// Define a component to render <user/> tags as @mention
const UserTag = ({ children }) => (
  <span style={{ color: 'blue', fontWeight: 'bold' }}>{children}</span>
);

const decorator = new CompositeDecorator([
  {
    strategy: userTagStrategy,
    component: UserTag,
  },
]);

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

// Dynamically load the Editor component to ensure it only renders on the client
const DynamicEditor = dynamic(() => import('@draft-js-plugins/editor'), {
  ssr: false, // Disable server-side rendering for this component
});

const RichTextEditorPage = () => {
  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionTrigger: '@', // Ensure the trigger character is set to '@'
      mentionPrefix: '@', // Prefix mentions with '@' when rendered
    });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin, toolbarPlugin]; // Include toolbarPlugin
    return { plugins, MentionSuggestions };
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(exampleHtmlInput)),
      decorator
    )
  );
  const [htmlOutput, setHtmlOutput] = useState('');
  const [mentionSuggestions, setMentionSuggestions] = useState(mentions);
  const [isClient, setIsClient] = useState(false); // Track if rendering on the client
  const [mentionOpen, setMentionOpen] = useState(false); // Track mention suggestions open state
  const editorRef = useRef<Editor | null>(null); // Ref for the editor instance

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts on the client
  }, []);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const html = stateToHTML(contentState); // Convert content to raw HTML
    setHtmlOutput(html);
  };

  const insertCustomTag = (tagName: string) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const newContentState = Modifier.replaceText(
      contentState,
      selectionState,
      `<user name="${tagName}" traceId="" />`,
      null
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    setEditorState(
      EditorState.forceSelection(newEditorState, newEditorState.getSelection())
    );
  };

  const onSearchChange = ({ value }: { value: string }) => {
    const filteredSuggestions = mentions.filter((mention) =>
      mention.name.toLowerCase().includes(value.toLowerCase())
    );
    setMentionSuggestions(filteredSuggestions);
  };

  const onMentionSelect = (mention) => {
    insertCustomTag(mention.name); // Insert the <user/> tag when a mention is selected
    setMentionOpen(false);
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <Container>
      <h1>Rich Text Editor</h1>
      <Toolbar /> {/* Render Toolbar */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '200px',
        }}
        onClick={focusEditor} // Focus editor when the container is clicked
      >
        <DynamicEditor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          plugins={plugins} // Pass the plugins array to the Editor
        />
        <MentionSuggestions
          open={mentionOpen}
          onOpenChange={setMentionOpen}
          onSearchChange={onSearchChange}
          suggestions={mentionSuggestions}
          onAddMention={onMentionSelect} // Handle mention selection
        />
      </div>
      <h2>Raw HTML Output</h2>
      <Stack component={'pre'} sx={{ whiteSpace: 'pre-wrap' }}>
        {htmlOutput}
      </Stack>
    </Container>
  );
};

export default RichTextEditorPage;
