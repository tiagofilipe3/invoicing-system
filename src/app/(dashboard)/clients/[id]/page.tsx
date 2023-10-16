import ClientForm from '@/app/components/ClientForm'

const EditClient = ({ params }: { params: { id: number } }) => {
  return <ClientForm id={params.id} />
}

export default EditClient
