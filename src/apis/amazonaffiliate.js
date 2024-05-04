const AWS = require('aws-sdk');

const associateTag = 'YOUR_ASSOCIATE_TAG';
const region = 'YOUR_REGION'; // Replace with your actual region

const getAmazonAffiliateProductLink = async (searchText) => {
  // Create an Amazon Advertising API client
  const client = new AWS.AdvertisingAPI({
    region,
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  });

  // Prepare the request parameters
  const params = {
    Keywords: searchText,
    Count: 1, // Only return the first result
    SearchCriteria: 'title', // Search by product title
  };

  // Send the request to the ProductSearch operation
  try {
    const response = await client.productSearch(params).promise();
    const product = response.ProductResults[0];

    // Check if a product was found
    if (product) {
      // Extract the product details
      const asin = product.ASIN;
      const title = product.Title;

      // Construct the affiliate-linked product URL
      const affiliateLink = `https://www.amazon.com/dp/${asin}?tag=${associateTag}`;

      // Return the affiliate link and product information
      return {
        affiliateLink,
        asin,
        title,
      };
    } else {
      // No product found
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Example usage
(async () => {
  const searchText = 'iPhone 14 Pro Max';
  const productInfo = await getAmazonAffiliateProductLink(searchText);

  if (productInfo) {
    console.log(`Affiliate link: ${productInfo.affiliateLink}`);
    console.log(`Product title: ${productInfo.title}`);
    console.log(`ASIN: ${productInfo.asin}`);
  } else {
    console.log('Product not found');
  }
})();
