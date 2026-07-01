import React from "react";
import Text from "../Text";
import Icon from "../Icon";
import { Clock } from "lucide-react";
import TrackTableItem, { Track } from "../TrackTableItem";

interface TrackTableProps {
	tracks: Track[];
	variant?: "playlist" | "album" | "artist";
}

export default function TrackTable({ tracks, variant = "playlist" }: TrackTableProps) {
	const gridStyles = {
		playlist: "grid grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_minmax(100px,120px)] gap-4 px-4 py-2",
		album: "grid grid-cols-[16px_minmax(120px,1fr)_minmax(100px,120px)] gap-4 px-4 py-2",
		artist: "grid grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(100px,120px)] gap-4 px-4 py-2",
	};

	const currentGridClass = gridStyles[variant];

	return (
		<div className="w-full flex flex-col w-full">
			
			{variant !== "artist" && (
				<div className={`items-center border-b border-[var(--bg-secondary)]/30 mb-4 pb-2 ${currentGridClass}`}>
					<div className="flex justify-center">
						<Text textString="#" color="--text-secondary" size="sm" />
					</div>
					
					<div>
						<Text textString="Título" color="--text-secondary" size="sm" />
					</div>

					{variant === "playlist" && (
						<>
							<div>
								<Text textString="Álbum" color="--text-secondary" size="sm" />
							</div>
							<div>
								<Text textString="Adicionada em" color="--text-secondary" size="sm" />
							</div>
						</>
					)}

					<div className="flex justify-end items-center gap-4 pr-4">
						<Icon src={Clock} size={16} color="var(--text-secondary)" />
						<div className="w-[20px]"></div> 
					</div>
				</div>
			)}

			<div className="flex flex-col gap-1">
				{tracks.map((track, index) => (
					<TrackTableItem 
						key={track.id} 
						track={track} 
						index={index + 1} 
						variant={variant} 
						gridClass={currentGridClass} 
					/>
				))}
			</div>
			
		</div>
	);
}