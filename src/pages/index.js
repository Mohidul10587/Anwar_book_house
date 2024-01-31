import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import ProductCard from "@/components/card/productCard";
import RootLayout from "@/components/layouts/RootLayout";

export default function Home({ products }) {
  // const [products, setProducts] = useState([]);
  // console.log(searchQuery);
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading as true

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const productsResponse = await fetch(`${url}/api/v1/products`, {
  //         method: "GET",
  //       });
  //       const productsResult = await productsResponse.json();
  //       const productsData = productsResult.data.data;

  //       const offerProductsResponse = await fetch(
  //         `${url}/api/v1/offerProducts`,
  //         {
  //           method: "GET",
  //         }
  //       );
  //       const offerProductsResult = await offerProductsResponse.json();
  //       const offerProductsData = offerProductsResult.data.data;

  //       setProducts(productsData);
  //       setOfferProducts(offerProductsData);
  //       setLoading(false); // Set loading to false after data is fetched
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false); // Set loading to false in case of an error
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="sm:py-28 py-20 bg-white">
        <main className="w-full max-w-7xl">
          <Banner />
          <div className="mt-8 mx-4">
            <h1 className="text-2xl text-green-500">Awesome Offer For You</h1>
            {/* <div className="mt-2">
              {loading ? ( // Display loading state if loading is true
                <p>Loading...</p>
              ) : (
                <div className="grid md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2  mb-10 place-content-center">
                  {offerProducts.map((p) => (
                    <ProductCard p={p} key={p._id} />
                  ))}
                </div>
              )}
            </div> */}
          </div>
          <div className="mt-8 mx-4">
            <h1 className="text-2xl text-green-500">Our Collection For You</h1>
            <div className="mt-2">
              {loading ? ( // Display loading state if loading is true
                <p>Loading...</p>
              ) : (
                <div className="grid md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2  mb-10 place-content-center">
                  {products.map((p) => (
                    <ProductCard p={p} key={p.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getStaticProps() {
  try {
    const queryParams = new URLSearchParams({
      search: "",
      genre: "",
      publisher: "",
    });

    const productsResponse = await fetch(
      `http://test.notebookprokash.com/products?${queryParams}`,
      {
        method: "GET",
      }
    );
    const productsResult = await productsResponse.json();

    const products = productsResult.products;

    // const offerProductsResponse = await fetch(`${url}/api/v1/offerProducts`, {
    //   method: "GET",
    // });
    // const offerProductsResult = await offerProductsResponse.json();
    // const offerProducts = offerProductsResult.data.data;

    return {
      props: {
        products,
        // offerProducts, // Add the data from the second API as a prop
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
        // offerProducts: [], // Initialize the second API data as an empty array
      },
    };
  }
}
