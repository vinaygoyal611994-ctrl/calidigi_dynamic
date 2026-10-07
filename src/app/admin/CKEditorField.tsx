'use client'
import { useEffect, useRef } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

declare global {
  interface Window { CKEDITOR: any }
}

const CDN_JS   = '/ckeditor/ckeditor.js'
const CKE_BASE = 'https://api.pcfcourierlogistics.com/js/admin/ckeditor/'

let _counter = 0

export default function CKEditorField({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef    = useRef<any>(null)
  const onChangeRef  = useRef(onChange)
  const instanceId   = useRef(`cke_i_${++_counter}`).current
  onChangeRef.current = onChange

  useEffect(() => {
    let destroyed = false

    function initEditor() {
      if (destroyed || !containerRef.current) return

      // Clear any leftover DOM from previous CKEditor instance
      containerRef.current.innerHTML = ''

      // Destroy any existing CKEDITOR instance with same name
      if (window.CKEDITOR?.instances?.[instanceId]) {
        try { window.CKEDITOR.instances[instanceId].destroy(true) } catch {}
      }

      const textarea = document.createElement('textarea')
      textarea.id = instanceId
      containerRef.current.appendChild(textarea)

      try {
        const editor = window.CKEDITOR.replace(textarea, {
          height: 320,
          removePlugins: 'elementspath',
          resize_enabled: true,
          toolbar: [
            { name: 'document',    items: ['Source', '-', 'Preview', 'Print'] },
            { name: 'clipboard',   items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
            { name: 'editing',     items: ['Find', 'Replace', '-', 'SelectAll'] },
            '/',
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
            { name: 'paragraph',   items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'links',       items: ['Link', 'Unlink', 'Anchor'] },
            { name: 'insert',      items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
            '/',
            { name: 'styles',      items: ['Styles', 'Format', 'Font', 'FontSize'] },
            { name: 'colors',      items: ['TextColor', 'BGColor'] },
          ],
        })
        editorRef.current = editor
        editor.on('instanceReady', () => {
          if (!destroyed) editor.setData(value || '')
        })
        editor.on('change', () => onChangeRef.current(editor.getData()))
        editor.on('key',    () => setTimeout(() => onChangeRef.current(editor.getData()), 0))
      } catch (e) {
        console.error('CKEditor init error:', e)
      }
    }

    function loadAndInit() {
      if (document.getElementById('cke4-script')) {
        const iv = setInterval(() => {
          if (window.CKEDITOR) { clearInterval(iv); initEditor() }
        }, 80)
        return
      }
      ;(window as any).CKEDITOR_BASEPATH = CKE_BASE
      const script = document.createElement('script')
      script.id  = 'cke4-script'
      script.src = CDN_JS
      script.onload = initEditor
      document.head.appendChild(script)
    }

    // Small delay when CKEDITOR already loaded to avoid race conditions
    if (window.CKEDITOR) {
      setTimeout(initEditor, 50)
    } else {
      loadAndInit()
    }

    return () => {
      destroyed = true
      try {
        if (editorRef.current) {
          editorRef.current.destroy(true)
          editorRef.current = null
        }
      } catch {}
      try {
        if (containerRef.current) containerRef.current.innerHTML = ''
      } catch {}
    }
  }, [])

  return <div ref={containerRef} />
}
