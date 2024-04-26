import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { toast } from "@/components/ui/use-toast";
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import axios from "axios"
import { ToastAction } from "@/components/ui/toast"
import Loader from '@/components/loader';
import GeneralError from "../errors/general-error"

export default function Tasks() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/user/all");
        setCustomers(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error.response) {
          console.error("Request failed with status code:", error.response.status);
          console.error("Error message:", error.response.data.error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.response.data.error,
            action: <ToastAction onClick={() => fetchData()} altText="Try again">Try again</ToastAction>,
          });
          setError(error.response.data.error);
        } else if (error.request) {
          console.error("No response received:", error.request);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "No response received from server",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setError("No response received from server");
        } else {
          console.error("Error setting up request:", error.message);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Error setting up request",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setError("Error setting up request");
        }
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  console.log(error);
  

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <GeneralError minimal={true}/>
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={customers} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}
