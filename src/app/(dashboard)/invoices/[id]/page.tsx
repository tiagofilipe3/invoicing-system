import InvoiceForm from '@/app/components/InvoiceForm'

const EditInvoice = ({ params }: { params: { id: number } }) => {
  return <InvoiceForm id={params.id} />
}

export default EditInvoice
