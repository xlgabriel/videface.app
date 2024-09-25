import React from "react";

export default function DocumentDownload() {
    return (
        <div className="p-4">
            <div>Click to download</div>
            <div className="flex space-x-3 mt-3">
                <a href="/downloadFiles/run.bat" download="run.bat">
                    <button className="bg-blue-500 rounded px-4 py-2 text-white">Download run.bat</button>
                </a>

                <a href="/downloadFiles/videface_background.png" download="background.png">
                    <button className="bg-blue-500 rounded px-4 py-2 text-white">Download Background</button>
                </a>
            </div>
        </div>
    );
}
