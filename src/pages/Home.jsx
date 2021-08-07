import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  IconWand,
  IconCopy,
  IconLoader,
  IconClipboardCheck,
} from "@tabler/icons";
import { isValidHttpUrl } from "../helpers";
import { baseUrl } from "../config";
import Input from "../components/Input";
import Button from "../components/Button";

import { Link } from "react-router-dom";
import { historyContext } from "../utils/HistoryProvider";
export default function HomePage() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const [clipboard, setClipboard] = useState(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { setHistory, history } = useContext(historyContext);
  console.log("history", history);
  async function readClipboard() {
    const clipboard = await navigator.clipboard.readText();
    console.log(clipboard);
    if (isValidHttpUrl(clipboard)) {
      setClipboard(clipboard);
    }
  }

  // function readFromClipboard() {
  //   // navigator clipboard api needs a secure context (https)
  //   if (navigator?.clipboard?.readText && window.isSecureContext) {
  //     // navigator clipboard api method'
  //     return navigator.clipboard.readText(clipboard);
  //   } else {
  //     // text area method
  //     let textArea = document.createElement("textarea");
  //     textArea.value = clipboard;
  //     // make the textarea out of viewport
  //     textArea.style.position = "fixed";
  //     textArea.style.left = "-999999px";
  //     textArea.style.top = "-999999px";
  //     document.body.appendChild(textArea);
  //     textArea.focus();
  //     textArea.select();
  //     return new Promise((res, rej) => {
  //       // here the magic happens
  //       document.execCommand("copy") ? res() : rej();
  //       textArea.remove();
  //     });
  //   }
  // }

  useEffect(() => {
    if (navigator.clipboard.readText) {
      readClipboard();
      window.addEventListener("focus", readClipboard);
      return () => {
        window.removeEventListener("focus", readClipboard);
      };
    }
  }, []);

  async function submitUrl(longUrl) {
    console.log(longUrl, isValidHttpUrl(longUrl));
    if (loading) return;
    if (!isValidHttpUrl(longUrl)) {
      setLoading(false);
      setError("Your url is invalid!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${window.location.protocol}//${baseUrl}/api/cut`,
        {
          url: longUrl,
        }
      );
      setLoading(false);
      setShortUrl(response.data.shortUrl);
      setHistory((prev) => {
        prev.push({ [response.data.shortUrl]: longUrl });
        console.log(prev);
        return prev;
      });
      setError(null);
      copyToClipboard(response.data.shortUrl);
    } catch (e) {
      console.log(e);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    await submitUrl(url);
    setUrl("");
  }
  function handleChange(event) {
    setUrl(event.target.value);
    if (error) setError(null);
  }
  function copyToClipboard(key) {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${baseUrl}/${key}`
    );
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  }
  return (
    <div className="p-8 bg-indigo-50 rounded-lg shadow-md">
      {clipboard ? (
        <div>
          <div className="text-gray-500 flex items-center gap-2 ">
            <IconClipboardCheck size={20} />
            <span className="italic">We detect a url on your clipboard.</span>
          </div>
          <a
            href={clipboard}
            target="_blank"
            rel="noreferrer"
            className="w-30 line-clamp text-xl text-gray-700 hover:text-indigo-500 w-full overflow-hidden"
            style={{
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "1",
            }}
            title={clipboard}
          >
            {clipboard}
          </a>
          <div className="flex gap-2 mt-4 w-full">
            <Button
              disabled={loading}
              onClick={() => {
                submitUrl(clipboard);
              }}
              className="flex-grow"
            >
              {loading ? (
                <IconLoader size={24} className="animate-spin-slow" />
              ) : (
                <span>short it!</span>
              )}
            </Button>
            {loading ? null : (
              <Button
                disabled={loading}
                onClick={() => {
                  setClipboard(null);
                  setShortUrl(null);
                }}
                className="flex-grow bg-gray-300 hover:bg-gray-400 hover:shadow-md active:bg-indigo-400 transition disabled:text-gray-500 disabled:bg-gray-300 disabled:pointer-events-none"
              >
                use another url
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <form className="flex gap-2" onSubmit={submitHandler}>
            <Input
              value={url}
              onChange={handleChange}
              placeholder="paste your long url"
              className="flex-grow py-2 px-4 rounded-lg outline-none focus:shadow-md transition"
              type="text"
              error={[error, error]}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <IconLoader size={24} className="animate-spin-slow" />
              ) : (
                <IconWand size={24} />
              )}
            </Button>
          </form>
          <p className="text-sm text-gray-500 mt-2">
            Do you want customize your short url?
            <br />
            Please{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-500">
              login
            </Link>{" "}
            first.
          </p>
        </>
      )}
      {shortUrl ? (
        <div className="mt-8">
          <div
            className={`italic flex gap-2 items-center text-gray-500 ${
              copiedToClipboard ? "animate-pulse" : ""
            } `}
          >
            <IconCopy size={20} />
            Copied to your clipboard
          </div>
          <div
            onClick={() => copyToClipboard(shortUrl)}
            className="flex items-center gap-2 mt-2 cursor-pointer transition hover:text-indigo-500 text-gray-700"
          >
            <div className="text-2xl">
              <span className="font-semibold">{baseUrl}</span>/{shortUrl}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
