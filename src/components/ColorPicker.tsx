import Popover from "@mui/material/Popover";
import { colors } from "../utils/colors";

type ColorPickerProps = {
	anchorEl: HTMLElement | null;
	open: boolean;
	onClose: () => void;
	value: number;
	onChange: (index: number) => void;
};

export default function ColorPicker({ anchorEl, open, onClose, value, onChange }: ColorPickerProps) {
	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			transformOrigin={{ vertical: "top", horizontal: "left" }}
		>
			<div className="color-picker-grid">
				{colors.map((c, idx) => (
					<button
						key={c}
						className={"color-swatch" + (idx === value ? " selected" : "")}
						style={{ backgroundColor: c }}
						onClick={() => { onChange(idx); onClose(); }}
					/>
				))}
			</div>
		</Popover>
	);
}