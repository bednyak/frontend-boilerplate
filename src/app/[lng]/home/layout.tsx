import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full overflow-y-hidden">
			{children}
		</div>
	);
};

export default HomeLayout;
