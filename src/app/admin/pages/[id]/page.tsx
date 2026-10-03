'use client'
import { useParams } from 'next/navigation'
import PageEditor from '../_editor'

export default function EditPage() {
  const { id } = useParams()
  return <PageEditor mode="edit" id={Number(id)} />
}
