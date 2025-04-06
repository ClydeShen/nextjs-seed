'use client';
import { FormDynamicInput } from '@components/Form/FormDynamicInput';
import { Box, Stack, Typography } from '@mui/material';
import { Row } from 'form';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useMemo, useState } from 'react';

export const FormCardMarkdownSectionRow = (props: Row) => {
  const { template, description, fields, required } = props;
  const [processedContent, setProcessedContent] =
    useState<MDXRemoteSerializeResult>();

  useEffect(() => {
    const processMarkdown = async () => {
      if (!template) return;
      // Process markdown and serialize for MDX
      const mdxSource = await serialize(template);
      setProcessedContent(mdxSource);
    };

    processMarkdown();
  }, [template, fields]);
  const components = useMemo(() => {
    return {
      strong: (props) => (
        <Typography component='span' fontWeight='bold'>
          {props.children}
        </Typography>
      ),
      p: (props) => (
        <Typography component='div' sx={{ display: 'inline' }}>
          {props.children}
        </Typography>
      ),
      code: (props: any) => {
        const { children } = props;
        const field = fields.find((f) => f.fieldRef === children);
        return field ? (
          <Box sx={{ display: 'inline-block' }}>
            <FormDynamicInput field={field} inline />
          </Box>
        ) : null;
      },
    };
  }, []);
  return (
    <Stack>
      {processedContent && (
        <MDXRemote {...processedContent} components={components} />
      )}
    </Stack>
  );
};
