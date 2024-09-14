/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
			},
		],
	},
	output: "standalone",
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	  },
	  eslint: {
		ignoreDuringBuilds: true,
	  },	  	
};

export default nextConfig;
