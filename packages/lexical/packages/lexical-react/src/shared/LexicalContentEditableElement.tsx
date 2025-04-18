import { useCallback, useRef, useState } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import useLexicalEditorEffect from '../useLexicalEditorEffect'

import type * as React from 'react'

export type Props = {
	ariaActiveDescendant?: React.AriaAttributes['aria-activedescendant']
	ariaAutoComplete?: React.AriaAttributes['aria-autocomplete']
	ariaControls?: React.AriaAttributes['aria-controls']
	ariaDescribedBy?: React.AriaAttributes['aria-describedby']
	ariaExpanded?: React.AriaAttributes['aria-expanded']
	ariaLabel?: React.AriaAttributes['aria-label']
	ariaLabelledBy?: React.AriaAttributes['aria-labelledby']
	ariaMultiline?: React.AriaAttributes['aria-multiline']
	ariaOwns?: React.AriaAttributes['aria-owns']
	ariaRequired?: React.AriaAttributes['aria-required']
	autoCapitalize?: HTMLDivElement['autocapitalize']
	'data-testid'?: string | null | undefined
} & Omit<React.AllHTMLAttributes<HTMLDivElement>, 'placeholder'>

export function ContentEditableElement({
	ariaActiveDescendant,
	ariaAutoComplete,
	ariaControls,
	ariaDescribedBy,
	ariaExpanded,
	ariaLabel,
	ariaLabelledBy,
	ariaMultiline,
	ariaOwns,
	ariaRequired,
	autoCapitalize,
	className,
	id,
	role = 'textbox',
	spellCheck = true,
	style,
	tabIndex,
	'data-testid': testid,
	...rest
}: Props): React.JSX.Element {
	const [editor] = useLexicalComposerContext()
	const [isEditable, setEditable] = useState(false)
	const [unmounted, setUnmounted] = useState<() => void>()

	const root = useRef<HTMLElement>(null)

	const onChangeRef = useCallback(
		(rootElement: null | HTMLElement) => {
			if (rootElement) root.current = rootElement

			if (rootElement && rootElement.ownerDocument && rootElement.ownerDocument.defaultView) {
				editor.setRootElement(rootElement)
			} else {
				if (root.current?.isConnected) return

				editor.setRootElement(null)
			}
		},
		[editor]
	)

	useLexicalEditorEffect({
		mounted: () => {
			setEditable(editor.isEditable())

			setUnmounted(() =>
				editor.registerEditableListener(currentIsEditable => {
					setEditable(currentIsEditable)
				})
			)
		},
		unmounted,
		editor,
		deps: [editor]
	})

	return (
		<div
			{...rest}
			aria-activedescendant={!isEditable ? undefined : ariaActiveDescendant}
			aria-autocomplete={!isEditable ? 'none' : ariaAutoComplete}
			aria-controls={!isEditable ? undefined : ariaControls}
			aria-describedby={ariaDescribedBy}
			aria-expanded={!isEditable ? undefined : role === 'combobox' ? !!ariaExpanded : undefined}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			aria-multiline={ariaMultiline}
			aria-owns={!isEditable ? undefined : ariaOwns}
			aria-readonly={!isEditable ? true : undefined}
			aria-required={ariaRequired}
			autoCapitalize={autoCapitalize}
			className={className}
			contentEditable={isEditable}
			data-testid={testid}
			id={id}
			ref={onChangeRef}
			role={role}
			spellCheck={false}
			style={style}
			tabIndex={tabIndex}
		/>
	)
}
