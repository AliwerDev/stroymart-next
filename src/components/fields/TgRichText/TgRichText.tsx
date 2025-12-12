/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Show from '@/components/common/Show';
import ResetIcon from '@/components/icons/ResetIcon';
import { cn } from '@/lib/utils';

import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

interface TgRichTextProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  className?: string;
}

const TgRichText = ({ value, onChange, error, className }: TgRichTextProps) => {
  const t = useTranslations();
  const [isSetLink, setIsSetLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkRef = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState(value);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: false,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }
            return true;
          } catch {
            return false;
          }
        },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'tiptap notranslate',
        translate: 'no',
        'data-no-translate': 'true',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const setLink = useCallback(
    (link: string) => {
      if (!editor) return;

      if (!link) return;

      try {
        editor
          .chain()
          .focus()
          .unsetCode()
          .unsetItalic()
          .unsetBold()
          .extendMarkRange('link')
          .setLink({ href: link })
          .run();
      } catch (e) {
        console.error(e);
        return;
      }
    },
    [editor]
  );

  const handleClose = useCallback(() => {
    setIsSetLink(false);
    setLinkUrl('');
  }, []);

  useEffect(() => {
    if (editor && !val && value) {
      setVal(value);
      editor.commands.setContent(value);
    }
  }, [val, value]);

  return (
    <div translate="no">
      {editor && (
        <BubbleMenu
          options={{
            onHide: handleClose,
            onDestroy: handleClose,
          }}
          className="bubble-menu"
          editor={editor}
        >
          <div className={cn('flex items-center gap-1', !isSetLink && 'hidden')}>
            <input
              type="text"
              value={linkUrl}
              placeholder={t('Enter link')}
              onChange={(e) => setLinkUrl(e.target.value)}
              ref={linkRef}
            />
            <button
              type="button"
              onClick={() => {
                setIsSetLink(false);
                setLink(linkUrl);
                setLinkUrl('');
              }}
            >
              {t('Set Link')}
            </button>
          </div>
          <Show when={!isSetLink}>
            <button type="button" onClick={() => editor.chain().focus().setBold().run()}>
              {t('Bold')}
            </button>
            <button type="button" onClick={() => editor.chain().focus().setItalic().run()}>
              {t('Italic')}
            </button>
            <button type="button" onClick={() => editor.chain().focus().setCode().run()}>
              {t('Code')}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSetLink(true);
                linkRef.current?.focus();
              }}
            >
              {t('Link')}
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().unsetLink().unsetCode().unsetItalic().unsetBold().run()
              }
            >
              <ResetIcon className="w-4 h-4" />
            </button>
          </Show>
        </BubbleMenu>
      )}

      <EditorContent
        spellCheck={false}
        className={cn(
          '[&>.tiptap]:!outline-none [&>.tiptap]:text-text-1 [&>.tiptap]:border [&>.tiptap]:border-gray-200 [&>.tiptap]:bg-white [&>.tiptap]:rounded-[10px] [&>.tiptap]:min-h-[200px] [&>.tiptap]:p-4',
          error
            ? '[&>.tiptap]:text-primary-500 [&>.tiptap]:placeholder:text-red-400 [&>.tiptap]:!bg-primary-50 [&>.tiptap]:!border-primary-500'
            : undefined,
          className
        )}
        editor={editor}
      />
    </div>
  );
};

export default TgRichText;
