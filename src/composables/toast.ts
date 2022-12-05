interface ReturnProp {
	createToast: (
		displayMsg: string,
		displayDuration: number,
		displayPostion: Options["DisplayPosition"],
		displayColor: Options["DisplayColor"],
		customCss?: string
	) => Promise<void>;
}

type Options = {
	DisplayPosition: "top" | "middle" | "bottom";
	DisplayColor:
		| "danger"
		| "dark"
		| "light"
		| "medium"
		| "primary"
		| "secondary"
		| "success"
		| "tertiary"
		| "warning";
};

export const useToast = (toastController: any): ReturnProp => {
	const createToast = async (
		displayMsg: string,
		displayDuration: number,
		displayPostion: Options["DisplayPosition"],
		displayColor: Options["DisplayColor"],
		customCss?: string
	) => {
		try {
			const toast = await toastController.create({
				message: displayMsg,
				duration: displayDuration,
				position: displayPostion,
				color: displayColor,
				cssClass: customCss,
			});

			await toast.present();
		} catch (e) {
			console.log(e);
		}
	};

	return {
		createToast,
	};
};
