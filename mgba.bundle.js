var mGBA = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // mgba.js
  var mgba_exports = {};
  __export(mgba_exports, {
    default: () => mgba_default
  });
  var import_meta = {};
  var mGBA = (() => {
    var _scriptName = import_meta.url;
    return async function(moduleArg = {}) {
      var moduleRtn;
      var Module = moduleArg;
      var readyPromiseResolve, readyPromiseReject;
      var readyPromise = new Promise((resolve, reject) => {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
      var ENVIRONMENT_IS_WEB = typeof window == "object";
      var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
      var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
      var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
      var ENVIRONMENT_IS_PTHREAD = ENVIRONMENT_IS_WORKER && self.name?.startsWith("em-pthread");
      Module.loadGame = (romPath, savePathOverride) => {
        const loadGame = cwrap("loadGame", "number", ["string", "string"]);
        if (loadGame(romPath, savePathOverride)) {
          const arr = romPath.split(".");
          arr.pop();
          const saveName = arr.join(".") + ".sav";
          Module.gameName = romPath;
          Module.saveName = savePathOverride ?? saveName.replace("/data/games/", "/data/saves/");
          return true;
        }
        return false;
      };
      Module.getSave = () => {
        return FS.readFile(Module.saveName);
      };
      Module.listRoms = () => {
        return FS.readdir("/data/games/");
      };
      Module.listSaves = () => {
        return FS.readdir("/data/saves/");
      };
      Module.FSInit = () => {
        return new Promise((resolve, reject) => {
          FS.mkdir("/data");
          FS.mount(FS.filesystems.IDBFS, {}, "/data");
          FS.syncfs(true, (err2) => {
            if (err2) {
              reject(new Error(`Error syncing app data from IndexedDB: ${err2}`));
            }
            try {
              FS.mkdir("/data/saves");
            } catch (e) {
            }
            try {
              FS.mkdir("/data/states");
            } catch (e) {
            }
            try {
              FS.mkdir("/data/games");
            } catch (e) {
            }
            try {
              FS.mkdir("/data/cheats");
            } catch (e) {
            }
            try {
              FS.mkdir("/data/screenshots");
            } catch (e) {
            }
            try {
              FS.mkdir("/data/patches");
            } catch (e) {
            }
            resolve();
          });
        });
      };
      Module.FSSync = () => {
        return new Promise((resolve, reject) => {
          FS.syncfs((err2) => {
            if (err2) {
              reject(new Error(`Error syncing app data to IndexedDB: ${err2}`));
            }
            resolve();
          });
        });
      };
      Module.filePaths = () => {
        return {
          root: "/data",
          cheatsPath: "/data/cheats",
          gamePath: "/data/games",
          savePath: "/data/saves",
          saveStatePath: "/data/states",
          screenshotsPath: "/data/screenshots",
          patchPath: "/data/patches"
        };
      };
      Module.uploadSaveOrSaveState = (file, callback) => {
        const split = file.name.split(".");
        if (split.length < 2) {
          console.warn("unrecognized file extension: " + file.name);
          return;
        }
        const extension = split[split.length - 1].toLowerCase();
        let dir = null;
        if (extension == "sav") {
          dir = "/data/saves/";
        } else if (extension.startsWith("ss")) {
          dir = "/data/states/";
        } else {
          console.warn("unrecognized file extension: " + extension);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          FS.writeFile(dir + file.name, new Uint8Array(e.target.result));
          if (callback) {
            callback();
          }
        };
        reader.readAsArrayBuffer(file);
      };
      Module.uploadRom = (file, callback) => {
        const split = file.name.split(".");
        if (split.length < 2) {
          console.warn("unrecognized file extension: " + file.name);
          return;
        }
        const extension = split[split.length - 1].toLowerCase();
        let dir = null;
        if (["gba", "gbc", "gb", "zip", "7z"].includes(extension)) {
          dir = "/data/games/";
        } else {
          console.warn("unrecognized file extension: " + extension);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          FS.writeFile(dir + file.name, new Uint8Array(e.target.result));
          if (callback) {
            callback();
          }
        };
        reader.readAsArrayBuffer(file);
      };
      Module.uploadCheats = (file, callback) => {
        const split = file.name.split(".");
        if (split.length < 2) {
          console.warn("unrecognized file extension: " + file.name);
          return;
        }
        const extension = split[split.length - 1].toLowerCase();
        let dir = null;
        if (extension == "cheats") {
          dir = "/data/cheats/";
        } else {
          console.warn("unrecognized file extension: " + extension);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          FS.writeFile(dir + file.name, new Uint8Array(e.target.result));
          if (callback) {
            callback();
          }
        };
        reader.readAsArrayBuffer(file);
      };
      Module.uploadPatch = (file, callback) => {
        const split = file.name.split(".");
        if (split.length < 2) {
          console.warn("unrecognized file extension: " + file.name);
          return;
        }
        const extension = split[split.length - 1].toLowerCase();
        let dir = null;
        if (["ips", "ups", "bps"].includes(extension)) {
          dir = "/data/patches/";
        } else {
          console.warn("unrecognized file extension: " + extension);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          FS.writeFile(dir + file.name, new Uint8Array(e.target.result));
          if (callback) {
            callback();
          }
        };
        reader.readAsArrayBuffer(file);
      };
      const keyBindings = /* @__PURE__ */ new Map([
        ["a", 0],
        ["b", 1],
        ["select", 2],
        ["start", 3],
        ["right", 4],
        ["left", 5],
        ["up", 6],
        ["down", 7],
        ["r", 8],
        ["l", 9]
      ]);
      Module.buttonPress = (name) => {
        const buttonPress = cwrap("buttonPress", null, ["number"]);
        buttonPress(keyBindings.get(name.toLowerCase()));
      };
      Module.buttonUnpress = (name) => {
        const buttonUnpress = cwrap("buttonUnpress", null, ["number"]);
        buttonUnpress(keyBindings.get(name.toLowerCase()));
      };
      Module.bindKey = (bindingName, inputName) => {
        const bindKey = cwrap("bindKey", null, ["string", "number"]);
        bindKey(bindingName, keyBindings.get(inputName.toLowerCase()));
      };
      Module.pauseGame = () => {
        const pauseGame = cwrap("pauseGame", null, []);
        pauseGame();
      };
      Module.resumeGame = () => {
        const resumeGame = cwrap("resumeGame", null, []);
        resumeGame();
      };
      Module.pauseAudio = () => {
        const pauseAudio = cwrap("pauseAudio", null, []);
        pauseAudio();
      };
      Module.resumeAudio = () => {
        const resumeAudio = cwrap("resumeAudio", null, []);
        resumeAudio();
      };
      Module.getVolume = () => {
        const getVolume = cwrap("getVolume", "number", []);
        return getVolume();
      };
      Module.setVolume = (percent) => {
        const setVolume = cwrap("setVolume", null, ["number"]);
        setVolume(percent);
      };
      Module.getMainLoopTimingMode = () => {
        const getMainLoopTimingMode = cwrap("getMainLoopTimingMode", "number", []);
        return getMainLoopTimingMode();
      };
      Module.getMainLoopTimingValue = () => {
        const getMainLoopTimingValue = cwrap("getMainLoopTimingValue", "number", []);
        return getMainLoopTimingValue();
      };
      Module.setMainLoopTiming = (mode, value) => {
        const setMainLoopTiming = cwrap("setMainLoopTiming", "number", [
          "number",
          "number"
        ]);
        setMainLoopTiming(mode, value);
      };
      Module.quitGame = () => {
        const quitGame = cwrap("quitGame", null, []);
        quitGame();
      };
      Module.quitMgba = () => {
        const quitMgba = cwrap("quitMgba", null, []);
        quitMgba();
      };
      Module.quickReload = () => {
        const quickReload = cwrap("quickReload", null, []);
        quickReload();
      };
      Module.toggleInput = (toggle) => {
        const setEventEnable = cwrap("setEventEnable", null, ["boolean"]);
        setEventEnable(toggle);
      };
      Module.screenshot = (fileName) => {
        const screenshot = cwrap("screenshot", "boolean", ["string"]);
        return screenshot(fileName);
      };
      Module.saveState = (slot) => {
        const saveState = cwrap("saveState", "boolean", ["number"]);
        return saveState(slot);
      };
      Module.loadState = (slot) => {
        const loadState = cwrap("loadState", "boolean", ["number"]);
        return loadState(slot);
      };
      Module.saveStateSlot = (slot, flags) => {
        var saveStateSlot = cwrap("saveStateSlot", "number", ["number", "number"]);
        Module.saveStateSlot = (slot2, flags2) => {
          if (flags2 === void 0) {
            flags2 = 63;
          }
          return saveStateSlot(slot2, flags2);
        };
        return Module.saveStateSlot(slot, flags);
      };
      Module.loadStateSlot = (slot, flags) => {
        var loadStateSlot = cwrap("loadStateSlot", "number", ["number", "number"]);
        Module.loadStateSlot = (slot2, flags2) => {
          if (flags2 === void 0) {
            flags2 = 61;
          }
          return loadStateSlot(slot2, flags2);
        };
        return Module.loadStateSlot(slot, flags);
      };
      Module.autoLoadCheats = () => {
        const autoLoadCheats = cwrap("autoLoadCheats", "bool", []);
        return autoLoadCheats();
      };
      Module.setFastForwardMultiplier = (multiplier) => {
        const setFastForwardMultiplier = cwrap("setFastForwardMultiplier", null, [
          "number"
        ]);
        setFastForwardMultiplier(multiplier);
      };
      Module.getFastForwardMultiplier = () => {
        const getFastForwardMultiplier = cwrap(
          "getFastForwardMultiplier",
          "number",
          []
        );
        return getFastForwardMultiplier();
      };
      const coreCallbackStore = {
        alarmCallbackPtr: null,
        coreCrashedCallbackPtr: null,
        keysReadCallbackPtr: null,
        saveDataUpdatedCallbackPtr: null,
        videoFrameEndedCallbackPtr: null,
        videoFrameStartedCallbackPtr: null
      };
      Module.addCoreCallbacks = (callbacks) => {
        const addCoreCallbacks = cwrap("addCoreCallbacks", null, ["number"]);
        Object.keys(coreCallbackStore).forEach((callbackKey) => {
          const callbackName = callbackKey.replace("CallbackPtr", "Callback");
          const callback = callbacks[callbackName];
          if (callback !== void 0 && !!coreCallbackStore[callbackKey]) {
            removeFunction(coreCallbackStore[callbackKey]);
            coreCallbackStore[callbackKey] = null;
          }
          if (!!callback)
            coreCallbackStore[callbackKey] = addFunction(callback, "vi");
        });
        addCoreCallbacks(
          coreCallbackStore.alarmCallbackPtr,
          coreCallbackStore.coreCrashedCallbackPtr,
          coreCallbackStore.keysReadCallbackPtr,
          coreCallbackStore.saveDataUpdatedCallbackPtr,
          coreCallbackStore.videoFrameEndedCallbackPtr,
          coreCallbackStore.videoFrameStartedCallbackPtr
        );
      };
      Module.toggleRewind = (toggle) => {
        const toggleRewind = cwrap("toggleRewind", null, ["boolean"]);
        toggleRewind(toggle);
      };
      Module.setCoreSettings = (coreSettings) => {
        const setIntegerCoreSetting = cwrap("setIntegerCoreSetting", null, [
          "string",
          "number"
        ]);
        if (coreSettings.allowOpposingDirections !== void 0)
          setIntegerCoreSetting(
            "allowOpposingDirections",
            coreSettings.allowOpposingDirections
          );
        if (coreSettings.rewindBufferCapacity !== void 0)
          setIntegerCoreSetting(
            "rewindBufferCapacity",
            coreSettings.rewindBufferCapacity
          );
        if (coreSettings.rewindBufferInterval !== void 0)
          setIntegerCoreSetting(
            "rewindBufferInterval",
            coreSettings.rewindBufferInterval
          );
        if (coreSettings?.frameSkip !== void 0)
          setIntegerCoreSetting("frameSkip", coreSettings.frameSkip);
        if (coreSettings.audioSampleRate !== void 0)
          setIntegerCoreSetting("audioSampleRate", coreSettings.audioSampleRate);
        if (coreSettings.audioBufferSize !== void 0)
          setIntegerCoreSetting("audioBufferSize", coreSettings.audioBufferSize);
        if (coreSettings.videoSync !== void 0)
          setIntegerCoreSetting("videoSync", coreSettings.videoSync);
        if (coreSettings.audioSync !== void 0)
          setIntegerCoreSetting("audioSync", coreSettings.audioSync);
        if (coreSettings.threadedVideo !== void 0)
          setIntegerCoreSetting("threadedVideo", coreSettings.threadedVideo);
        if (coreSettings.rewindEnable !== void 0)
          setIntegerCoreSetting("rewindEnable", coreSettings.rewindEnable);
        if (coreSettings.baseFpsTarget !== void 0)
          setIntegerCoreSetting("baseFpsTarget", coreSettings.baseFpsTarget);
        if (coreSettings.timestepSync !== void 0)
          setIntegerCoreSetting("timestepSync", coreSettings.timestepSync);
        if (coreSettings.showFpsCounter !== void 0)
          setIntegerCoreSetting("showFpsCounter", coreSettings.showFpsCounter);
      };
      var moduleOverrides = Object.assign({}, Module);
      var arguments_ = [];
      var thisProgram = "./this.program";
      var quit_ = (status, toThrow) => {
        throw toThrow;
      };
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      var readAsync, readBinary;
      if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document != "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (_scriptName) {
          scriptDirectory = _scriptName;
        }
        if (scriptDirectory.startsWith("blob:")) {
          scriptDirectory = "";
        } else {
          scriptDirectory = scriptDirectory.slice(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
        }
        {
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = (url) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(
                /** @type{!ArrayBuffer} */
                xhr.response
              );
            };
          }
          readAsync = async (url) => {
            var response = await fetch(url, { credentials: "same-origin" });
            if (response.ok) {
              return response.arrayBuffer();
            }
            throw new Error(response.status + " : " + response.url);
          };
        }
      } else {
      }
      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.error.bind(console);
      Object.assign(Module, moduleOverrides);
      moduleOverrides = null;
      if (Module["arguments"]) arguments_ = Module["arguments"];
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      var wasmBinary = Module["wasmBinary"];
      var wasmMemory;
      var wasmModule;
      var ABORT = false;
      var EXITSTATUS;
      function assert(condition, text) {
        if (!condition) {
          abort(text);
        }
      }
      var HEAP, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;
      var runtimeInitialized = false;
      var isFileURI = (filename) => filename.startsWith("file://");
      if (ENVIRONMENT_IS_PTHREAD) {
        let threadPrintErr = function(...args) {
          var text = args.join(" ");
          console.error(text);
        }, threadAlert = function(...args) {
          var text = args.join(" ");
          postMessage({ cmd: "alert", text, threadId: _pthread_self() });
        }, handleMessage = function(e) {
          try {
            var msgData = e["data"];
            var cmd = msgData.cmd;
            if (cmd === "load") {
              let messageQueue = [];
              self.onmessage = (e2) => messageQueue.push(e2);
              self.startWorker = (instance) => {
                postMessage({ cmd: "loaded" });
                for (let msg of messageQueue) {
                  handleMessage(msg);
                }
                self.onmessage = handleMessage;
              };
              for (const handler of msgData.handlers) {
                if (!Module[handler] || Module[handler].proxy) {
                  Module[handler] = (...args) => {
                    postMessage({ cmd: "callHandler", handler, args });
                  };
                  if (handler == "print") out = Module[handler];
                  if (handler == "printErr") err = Module[handler];
                }
              }
              wasmMemory = msgData.wasmMemory;
              updateMemoryViews();
              wasmModuleReceived(msgData.wasmModule);
            } else if (cmd === "run") {
              establishStackSpace(msgData.pthread_ptr);
              __emscripten_thread_init(
                msgData.pthread_ptr,
                /*is_main=*/
                0,
                /*is_runtime=*/
                0,
                /*can_block=*/
                1,
                0,
                0
              );
              PThread.threadInitTLS();
              __emscripten_thread_mailbox_await(msgData.pthread_ptr);
              if (!initializedJS) {
                initializedJS = true;
              }
              try {
                invokeEntryPoint(msgData.start_routine, msgData.arg);
              } catch (ex) {
                if (ex != "unwind") {
                  throw ex;
                }
              }
            } else if (msgData.target === "setimmediate") {
            } else if (cmd === "checkMailbox") {
              if (initializedJS) {
                checkMailbox();
              }
            } else if (cmd) {
              err(`worker: received unknown command ${cmd}`);
              err(msgData);
            }
          } catch (ex) {
            __emscripten_thread_crashed();
            throw ex;
          }
        };
        var wasmModuleReceived;
        var initializedJS = false;
        if (!Module["printErr"])
          err = threadPrintErr;
        self.alert = threadAlert;
        self.onunhandledrejection = (e) => {
          throw e.reason || e;
        };
        ;
        self.onmessage = handleMessage;
      }
      function updateMemoryViews() {
        var b = wasmMemory.buffer;
        Module["HEAP8"] = HEAP8 = new Int8Array(b);
        Module["HEAP16"] = HEAP16 = new Int16Array(b);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
        Module["HEAP32"] = HEAP32 = new Int32Array(b);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
        Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
        Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
      }
      if (!ENVIRONMENT_IS_PTHREAD) {
        if (Module["wasmMemory"]) {
          wasmMemory = Module["wasmMemory"];
        } else {
          var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 268435456;
          wasmMemory = new WebAssembly.Memory({
            "initial": INITIAL_MEMORY / 65536,
            "maximum": INITIAL_MEMORY / 65536,
            "shared": true
          });
        }
        updateMemoryViews();
      }
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }
        callRuntimeCallbacks(onPreRuns);
      }
      function initRuntime() {
        runtimeInitialized = true;
        if (ENVIRONMENT_IS_PTHREAD) return startWorker(Module);
        if (!Module["noFSInit"] && !FS.initialized) FS.init();
        TTY.init();
        wasmExports["__wasm_call_ctors"]();
        FS.ignorePermissions = false;
      }
      function preMain() {
      }
      function postRun() {
        if (ENVIRONMENT_IS_PTHREAD) return;
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }
        callRuntimeCallbacks(onPostRuns);
      }
      var runDependencies = 0;
      var dependenciesFulfilled = null;
      function getUniqueRunDependency(id) {
        return id;
      }
      function addRunDependency(id) {
        runDependencies++;
        Module["monitorRunDependencies"]?.(runDependencies);
      }
      function removeRunDependency(id) {
        runDependencies--;
        Module["monitorRunDependencies"]?.(runDependencies);
        if (runDependencies == 0) {
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      function abort(what) {
        Module["onAbort"]?.(what);
        what = "Aborted(" + what + ")";
        err(what);
        ABORT = true;
        what += ". Build with -sASSERTIONS for more info.";
        var e = new WebAssembly.RuntimeError(what);
        readyPromiseReject(e);
        throw e;
      }
      var wasmBinaryFile;
      function findWasmBinary() {
        if (Module["locateFile"]) {
          return locateFile("mgba.wasm");
        }
        return new URL("mgba.wasm", import_meta.url).href;
      }
      function getBinarySync(file) {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        if (readBinary) {
          return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
      }
      async function getWasmBinary(binaryFile) {
        if (!wasmBinary) {
          try {
            var response = await readAsync(binaryFile);
            return new Uint8Array(response);
          } catch {
          }
        }
        return getBinarySync(binaryFile);
      }
      async function instantiateArrayBuffer(binaryFile, imports) {
        try {
          var binary = await getWasmBinary(binaryFile);
          var instance = await WebAssembly.instantiate(binary, imports);
          return instance;
        } catch (reason) {
          err(`failed to asynchronously prepare wasm: ${reason}`);
          abort(reason);
        }
      }
      async function instantiateAsync(binary, binaryFile, imports) {
        if (!binary && typeof WebAssembly.instantiateStreaming == "function") {
          try {
            var response = fetch(binaryFile, { credentials: "same-origin" });
            var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
            return instantiationResult;
          } catch (reason) {
            err(`wasm streaming compile failed: ${reason}`);
            err("falling back to ArrayBuffer instantiation");
          }
          ;
        }
        return instantiateArrayBuffer(binaryFile, imports);
      }
      function getWasmImports() {
        assignWasmImports();
        return {
          "env": wasmImports,
          "wasi_snapshot_preview1": wasmImports
        };
      }
      async function createWasm() {
        function receiveInstance(instance, module) {
          wasmExports = instance.exports;
          registerTLSInit(wasmExports["_emscripten_tls_init"]);
          wasmTable = wasmExports["__indirect_function_table"];
          wasmModule = module;
          removeRunDependency("wasm-instantiate");
          return wasmExports;
        }
        addRunDependency("wasm-instantiate");
        function receiveInstantiationResult(result2) {
          return receiveInstance(result2["instance"], result2["module"]);
        }
        var info = getWasmImports();
        if (Module["instantiateWasm"]) {
          return new Promise((resolve, reject) => {
            Module["instantiateWasm"](info, (mod, inst) => {
              receiveInstance(mod, inst);
              resolve(mod.exports);
            });
          });
        }
        if (ENVIRONMENT_IS_PTHREAD) {
          return new Promise((resolve) => {
            wasmModuleReceived = (module) => {
              var instance = new WebAssembly.Instance(module, getWasmImports());
              resolve(receiveInstance(instance, module));
            };
          });
        }
        wasmBinaryFile ??= findWasmBinary();
        try {
          var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
          var exports = receiveInstantiationResult(result);
          return exports;
        } catch (e) {
          readyPromiseReject(e);
          return Promise.reject(e);
        }
      }
      var ASM_CONSTS = {
        310256: () => {
          console.error("thread instantiation failed");
        },
        310305: ($0, $1) => {
          Module.canvas.width = $0;
          Module.canvas.height = $1;
        },
        310362: ($0, $1, $2, $3, $4, $5, $6) => {
          Module.version = { gitCommit: UTF8ToString($0), gitShort: UTF8ToString($1), gitBranch: UTF8ToString($2), gitRevision: $3, binaryName: UTF8ToString($4), projectName: UTF8ToString($5), projectVersion: UTF8ToString($6) };
        },
        310594: ($0, $1) => {
          const funcPtr = $0;
          const ctx = $1;
          const func = wasmTable.get(funcPtr);
          if (func) func(ctx);
        },
        310692: ($0, $1) => {
          const funcPtr = $0;
          const ctx = $1;
          const func = wasmTable.get(funcPtr);
          if (func) func(ctx);
        },
        310790: ($0, $1) => {
          const funcPtr = $0;
          const ctx = $1;
          const func = wasmTable.get(funcPtr);
          if (func) func(ctx);
        },
        310888: ($0, $1) => {
          const funcPtr = $0;
          const ctx = $1;
          const func = wasmTable.get(funcPtr);
          if (func) func(ctx);
        },
        310986: ($0, $1) => {
          const funcPtr = $0;
          const ctx = $1;
          const func = wasmTable.get(funcPtr);
          if (func) func(ctx);
        },
        311084: ($0, $1) => {
          const funcPtr = $0;
          const ctx = $1;
          const func = wasmTable.get(funcPtr);
          if (func) func(ctx);
        },
        311182: () => {
          FS.syncfs(function(err2) {
            assert(!err2);
          });
        },
        311226: ($0) => {
          var str = UTF8ToString($0) + "\n\nAbort/Retry/Ignore/AlwaysIgnore? [ariA] :";
          var reply = window.prompt(str, "i");
          if (reply === null) {
            reply = "i";
          }
          return allocate(intArrayFromString(reply), "i8", ALLOC_NORMAL);
        },
        311451: () => {
          if (typeof AudioContext !== "undefined") {
            return true;
          } else if (typeof webkitAudioContext !== "undefined") {
            return true;
          }
          return false;
        },
        311598: () => {
          if (typeof navigator.mediaDevices !== "undefined" && typeof navigator.mediaDevices.getUserMedia !== "undefined") {
            return true;
          } else if (typeof navigator.webkitGetUserMedia !== "undefined") {
            return true;
          }
          return false;
        },
        311832: ($0) => {
          if (typeof Module["SDL2"] === "undefined") {
            Module["SDL2"] = {};
          }
          var SDL2 = Module["SDL2"];
          if (!$0) {
            SDL2.audio = {};
          } else {
            SDL2.capture = {};
          }
          if (!SDL2.audioContext) {
            if (typeof AudioContext !== "undefined") {
              SDL2.audioContext = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
              SDL2.audioContext = new webkitAudioContext();
            }
            if (SDL2.audioContext) {
              if (typeof navigator.userActivation === "undefined") {
                autoResumeAudioContext(SDL2.audioContext);
              }
            }
          }
          return SDL2.audioContext === void 0 ? -1 : 0;
        },
        312384: () => {
          var SDL2 = Module["SDL2"];
          return SDL2.audioContext.sampleRate;
        },
        312452: ($0, $1, $2, $3) => {
          var SDL2 = Module["SDL2"];
          var have_microphone = function(stream) {
            if (SDL2.capture.silenceTimer !== void 0) {
              clearInterval(SDL2.capture.silenceTimer);
              SDL2.capture.silenceTimer = void 0;
              SDL2.capture.silenceBuffer = void 0;
            }
            SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream);
            SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1);
            SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {
              if (SDL2 === void 0 || SDL2.capture === void 0) {
                return;
              }
              audioProcessingEvent.outputBuffer.getChannelData(0).fill(0);
              SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer;
              dynCall("vi", $2, [$3]);
            };
            SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode);
            SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination);
            SDL2.capture.stream = stream;
          };
          var no_microphone = function(error) {
          };
          SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
          SDL2.capture.silenceBuffer.getChannelData(0).fill(0);
          var silence_callback = function() {
            SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer;
            dynCall("vi", $2, [$3]);
          };
          SDL2.capture.silenceTimer = setInterval(silence_callback, $1 / SDL2.audioContext.sampleRate * 1e3);
          if (navigator.mediaDevices !== void 0 && navigator.mediaDevices.getUserMedia !== void 0) {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(have_microphone).catch(no_microphone);
          } else if (navigator.webkitGetUserMedia !== void 0) {
            navigator.webkitGetUserMedia({ audio: true, video: false }, have_microphone, no_microphone);
          }
        },
        314145: ($0, $1, $2, $3) => {
          var SDL2 = Module["SDL2"];
          SDL2.audio.scriptProcessorNode = SDL2.audioContext["createScriptProcessor"]($1, 0, $0);
          SDL2.audio.scriptProcessorNode["onaudioprocess"] = function(e) {
            if (SDL2 === void 0 || SDL2.audio === void 0) {
              return;
            }
            if (SDL2.audio.silenceTimer !== void 0) {
              clearInterval(SDL2.audio.silenceTimer);
              SDL2.audio.silenceTimer = void 0;
              SDL2.audio.silenceBuffer = void 0;
            }
            SDL2.audio.currentOutputBuffer = e["outputBuffer"];
            dynCall("vi", $2, [$3]);
          };
          SDL2.audio.scriptProcessorNode["connect"](SDL2.audioContext["destination"]);
          if (SDL2.audioContext.state === "suspended") {
            SDL2.audio.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
            SDL2.audio.silenceBuffer.getChannelData(0).fill(0);
            var silence_callback = function() {
              if (typeof navigator.userActivation !== "undefined") {
                if (navigator.userActivation.hasBeenActive) {
                  SDL2.audioContext.resume();
                }
              }
              SDL2.audio.currentOutputBuffer = SDL2.audio.silenceBuffer;
              dynCall("vi", $2, [$3]);
              SDL2.audio.currentOutputBuffer = void 0;
            };
            SDL2.audio.silenceTimer = setInterval(silence_callback, $1 / SDL2.audioContext.sampleRate * 1e3);
          }
        },
        315320: ($0, $1) => {
          var SDL2 = Module["SDL2"];
          var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels;
          for (var c = 0; c < numChannels; ++c) {
            var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c);
            if (channelData.length != $1) {
              throw "Web Audio capture buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
            }
            if (numChannels == 1) {
              for (var j = 0; j < $1; ++j) {
                setValue($0 + j * 4, channelData[j], "float");
              }
            } else {
              for (var j = 0; j < $1; ++j) {
                setValue($0 + (j * numChannels + c) * 4, channelData[j], "float");
              }
            }
          }
        },
        315925: ($0, $1) => {
          var SDL2 = Module["SDL2"];
          var buf = $0 >>> 2;
          var numChannels = SDL2.audio.currentOutputBuffer["numberOfChannels"];
          for (var c = 0; c < numChannels; ++c) {
            var channelData = SDL2.audio.currentOutputBuffer["getChannelData"](c);
            if (channelData.length != $1) {
              throw "Web Audio output buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
            }
            for (var j = 0; j < $1; ++j) {
              channelData[j] = HEAPF32[buf + (j * numChannels + c)];
            }
          }
        },
        316414: ($0) => {
          var SDL2 = Module["SDL2"];
          if ($0) {
            if (SDL2.capture.silenceTimer !== void 0) {
              clearInterval(SDL2.capture.silenceTimer);
            }
            if (SDL2.capture.stream !== void 0) {
              var tracks = SDL2.capture.stream.getAudioTracks();
              for (var i2 = 0; i2 < tracks.length; i2++) {
                SDL2.capture.stream.removeTrack(tracks[i2]);
              }
            }
            if (SDL2.capture.scriptProcessorNode !== void 0) {
              SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {
              };
              SDL2.capture.scriptProcessorNode.disconnect();
            }
            if (SDL2.capture.mediaStreamNode !== void 0) {
              SDL2.capture.mediaStreamNode.disconnect();
            }
            SDL2.capture = void 0;
          } else {
            if (SDL2.audio.scriptProcessorNode != void 0) {
              SDL2.audio.scriptProcessorNode.disconnect();
            }
            if (SDL2.audio.silenceTimer !== void 0) {
              clearInterval(SDL2.audio.silenceTimer);
            }
            SDL2.audio = void 0;
          }
          if (SDL2.audioContext !== void 0 && SDL2.audio === void 0 && SDL2.capture === void 0) {
            SDL2.audioContext.close();
            SDL2.audioContext = void 0;
          }
        },
        317420: ($0, $1, $2) => {
          var w = $0;
          var h = $1;
          var pixels = $2;
          if (!Module["SDL2"]) Module["SDL2"] = {};
          var SDL2 = Module["SDL2"];
          if (SDL2.ctxCanvas !== Module["canvas"]) {
            SDL2.ctx = Module["createContext"](Module["canvas"], false, true);
            SDL2.ctxCanvas = Module["canvas"];
          }
          if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) {
            SDL2.image = SDL2.ctx.createImageData(w, h);
            SDL2.w = w;
            SDL2.h = h;
            SDL2.imageCtx = SDL2.ctx;
          }
          var data = SDL2.image.data;
          var src = pixels / 4;
          var dst = 0;
          var num;
          if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
            num = data.length;
            while (dst < num) {
              var val = HEAP32[src];
              data[dst] = val & 255;
              data[dst + 1] = val >> 8 & 255;
              data[dst + 2] = val >> 16 & 255;
              data[dst + 3] = 255;
              src++;
              dst += 4;
            }
          } else {
            if (SDL2.data32Data !== data) {
              SDL2.data32 = new Int32Array(data.buffer);
              SDL2.data8 = new Uint8Array(data.buffer);
              SDL2.data32Data = data;
            }
            var data32 = SDL2.data32;
            num = data32.length;
            data32.set(HEAP32.subarray(src, src + num));
            var data8 = SDL2.data8;
            var i2 = 3;
            var j = i2 + 4 * num;
            if (num % 8 == 0) {
              while (i2 < j) {
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
              }
            } else {
              while (i2 < j) {
                data8[i2] = 255;
                i2 = i2 + 4 | 0;
              }
            }
          }
          SDL2.ctx.putImageData(SDL2.image, 0, 0);
        },
        318888: ($0, $1, $2, $3, $4) => {
          var w = $0;
          var h = $1;
          var hot_x = $2;
          var hot_y = $3;
          var pixels = $4;
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext("2d");
          var image = ctx.createImageData(w, h);
          var data = image.data;
          var src = pixels / 4;
          var dst = 0;
          var num;
          if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
            num = data.length;
            while (dst < num) {
              var val = HEAP32[src];
              data[dst] = val & 255;
              data[dst + 1] = val >> 8 & 255;
              data[dst + 2] = val >> 16 & 255;
              data[dst + 3] = val >> 24 & 255;
              src++;
              dst += 4;
            }
          } else {
            var data32 = new Int32Array(data.buffer);
            num = data32.length;
            data32.set(HEAP32.subarray(src, src + num));
          }
          ctx.putImageData(image, 0, 0);
          var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto";
          var urlBuf = _malloc(url.length + 1);
          stringToUTF8(url, urlBuf, url.length + 1);
          return urlBuf;
        },
        319876: ($0) => {
          if (Module["canvas"]) {
            Module["canvas"].style["cursor"] = UTF8ToString($0);
          }
        },
        319959: () => {
          if (Module["canvas"]) {
            Module["canvas"].style["cursor"] = "none";
          }
        },
        320028: () => {
          return window.innerWidth;
        },
        320058: () => {
          return window.innerHeight;
        }
      };
      class ExitStatus {
        name = "ExitStatus";
        constructor(status) {
          this.message = `Program terminated with exit(${status})`;
          this.status = status;
        }
      }
      var terminateWorker = (worker) => {
        worker.terminate();
        worker.onmessage = (e) => {
        };
      };
      var cleanupThread = (pthread_ptr) => {
        var worker = PThread.pthreads[pthread_ptr];
        PThread.returnWorkerToPool(worker);
      };
      var callRuntimeCallbacks = (callbacks) => {
        while (callbacks.length > 0) {
          callbacks.shift()(Module);
        }
      };
      var onPreRuns = [];
      var addOnPreRun = (cb) => onPreRuns.unshift(cb);
      var spawnThread = (threadParams) => {
        var worker = PThread.getNewWorker();
        if (!worker) {
          return 6;
        }
        PThread.runningWorkers.push(worker);
        PThread.pthreads[threadParams.pthread_ptr] = worker;
        worker.pthread_ptr = threadParams.pthread_ptr;
        var msg = {
          cmd: "run",
          start_routine: threadParams.startRoutine,
          arg: threadParams.arg,
          pthread_ptr: threadParams.pthread_ptr
        };
        worker.postMessage(msg, threadParams.transferList);
        return 0;
      };
      var runtimeKeepaliveCounter = 0;
      var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
      var stackSave = () => _emscripten_stack_get_current();
      var stackRestore = (val) => __emscripten_stack_restore(val);
      var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
      var INT53_MAX = 9007199254740992;
      var INT53_MIN = -9007199254740992;
      var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
      var proxyToMainThread = (funcIndex, emAsmAddr, sync, ...callArgs) => {
        var serializedNumCallArgs = callArgs.length * 2;
        var sp = stackSave();
        var args = stackAlloc(serializedNumCallArgs * 8);
        var b = args >> 3;
        for (var i2 = 0; i2 < callArgs.length; i2++) {
          var arg = callArgs[i2];
          if (typeof arg == "bigint") {
            HEAP64[b + 2 * i2] = 1n;
            HEAP64[b + 2 * i2 + 1] = arg;
          } else {
            HEAP64[b + 2 * i2] = 0n;
            HEAPF64[b + 2 * i2 + 1] = arg;
          }
        }
        var rtn = __emscripten_run_on_main_thread_js(funcIndex, emAsmAddr, serializedNumCallArgs, args, sync);
        stackRestore(sp);
        return rtn;
      };
      function _proc_exit(code) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(0, 0, 1, code);
        EXITSTATUS = code;
        if (!keepRuntimeAlive()) {
          PThread.terminateAllThreads();
          Module["onExit"]?.(code);
          ABORT = true;
        }
        quit_(code, new ExitStatus(code));
      }
      var handleException = (e) => {
        if (e instanceof ExitStatus || e == "unwind") {
          return EXITSTATUS;
        }
        quit_(1, e);
      };
      function exitOnMainThread(returnCode) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(1, 0, 0, returnCode);
        _exit(returnCode);
      }
      var exitJS = (status, implicit) => {
        EXITSTATUS = status;
        if (ENVIRONMENT_IS_PTHREAD) {
          exitOnMainThread(status);
          throw "unwind";
        }
        _proc_exit(status);
      };
      var _exit = exitJS;
      var PThread = {
        unusedWorkers: [],
        runningWorkers: [],
        tlsInitFunctions: [],
        pthreads: {},
        init() {
          if (!ENVIRONMENT_IS_PTHREAD) {
            PThread.initMainThread();
          }
        },
        initMainThread() {
          var pthreadPoolSize = 5;
          while (pthreadPoolSize--) {
            PThread.allocateUnusedWorker();
          }
          addOnPreRun(() => {
            addRunDependency("loading-workers");
            PThread.loadWasmModuleToAllWorkers(() => removeRunDependency("loading-workers"));
          });
        },
        terminateAllThreads: () => {
          for (var worker of PThread.runningWorkers) {
            terminateWorker(worker);
          }
          for (var worker of PThread.unusedWorkers) {
            terminateWorker(worker);
          }
          PThread.unusedWorkers = [];
          PThread.runningWorkers = [];
          PThread.pthreads = {};
        },
        returnWorkerToPool: (worker) => {
          var pthread_ptr = worker.pthread_ptr;
          delete PThread.pthreads[pthread_ptr];
          PThread.unusedWorkers.push(worker);
          PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
          worker.pthread_ptr = 0;
          __emscripten_thread_free_data(pthread_ptr);
        },
        threadInitTLS() {
          PThread.tlsInitFunctions.forEach((f) => f());
        },
        loadWasmModuleToWorker: (worker) => new Promise((onFinishedLoading) => {
          worker.onmessage = (e) => {
            var d = e["data"];
            var cmd = d.cmd;
            if (d.targetThread && d.targetThread != _pthread_self()) {
              var targetWorker = PThread.pthreads[d.targetThread];
              if (targetWorker) {
                targetWorker.postMessage(d, d.transferList);
              } else {
                err(`Internal error! Worker sent a message "${cmd}" to target pthread ${d.targetThread}, but that thread no longer exists!`);
              }
              return;
            }
            if (cmd === "checkMailbox") {
              checkMailbox();
            } else if (cmd === "spawnThread") {
              spawnThread(d);
            } else if (cmd === "cleanupThread") {
              cleanupThread(d.thread);
            } else if (cmd === "loaded") {
              worker.loaded = true;
              onFinishedLoading(worker);
            } else if (cmd === "alert") {
              alert(`Thread ${d.threadId}: ${d.text}`);
            } else if (d.target === "setimmediate") {
              worker.postMessage(d);
            } else if (cmd === "callHandler") {
              Module[d.handler](...d.args);
            } else if (cmd) {
              err(`worker sent an unknown command ${cmd}`);
            }
          };
          worker.onerror = (e) => {
            var message = "worker sent an error!";
            err(`${message} ${e.filename}:${e.lineno}: ${e.message}`);
            throw e;
          };
          var handlers = [];
          var knownHandlers = [
            "onExit",
            "onAbort",
            "print",
            "printErr"
          ];
          for (var handler of knownHandlers) {
            if (Module.propertyIsEnumerable(handler)) {
              handlers.push(handler);
            }
          }
          worker.postMessage({
            cmd: "load",
            handlers,
            wasmMemory,
            wasmModule
          });
        }),
        loadWasmModuleToAllWorkers(onMaybeReady) {
          if (ENVIRONMENT_IS_PTHREAD) {
            return onMaybeReady();
          }
          let pthreadPoolReady = Promise.all(PThread.unusedWorkers.map(PThread.loadWasmModuleToWorker));
          pthreadPoolReady.then(onMaybeReady);
        },
        allocateUnusedWorker() {
          var worker;
          worker = new Worker(new URL("mgba.js", import_meta.url), {
            "type": "module",
            // This is the way that we signal to the Web Worker that it is hosting
            // a pthread.
            "name": "em-pthread"
          });
          PThread.unusedWorkers.push(worker);
        },
        getNewWorker() {
          if (PThread.unusedWorkers.length == 0) {
            PThread.allocateUnusedWorker();
            PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0]);
          }
          return PThread.unusedWorkers.pop();
        }
      };
      var onPostRuns = [];
      var addOnPostRun = (cb) => onPostRuns.unshift(cb);
      var establishStackSpace = (pthread_ptr) => {
        var stackHigh = HEAPU32[pthread_ptr + 52 >> 2];
        var stackSize = HEAPU32[pthread_ptr + 56 >> 2];
        var stackLow = stackHigh - stackSize;
        _emscripten_stack_set_limits(stackHigh, stackLow);
        stackRestore(stackHigh);
      };
      function getValue(ptr, type = "i8") {
        if (type.endsWith("*")) type = "*";
        switch (type) {
          case "i1":
            return HEAP8[ptr];
          case "i8":
            return HEAP8[ptr];
          case "i16":
            return HEAP16[ptr >> 1];
          case "i32":
            return HEAP32[ptr >> 2];
          case "i64":
            return HEAP64[ptr >> 3];
          case "float":
            return HEAPF32[ptr >> 2];
          case "double":
            return HEAPF64[ptr >> 3];
          case "*":
            return HEAPU32[ptr >> 2];
          default:
            abort(`invalid type for getValue: ${type}`);
        }
      }
      var wasmTableMirror = [];
      var wasmTable;
      var getWasmTableEntry = (funcPtr) => {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
          if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
          wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
        }
        return func;
      };
      var invokeEntryPoint = (ptr, arg) => {
        runtimeKeepaliveCounter = 0;
        noExitRuntime = 0;
        var result = getWasmTableEntry(ptr)(arg);
        function finish(result2) {
          if (keepRuntimeAlive()) {
            EXITSTATUS = result2;
          } else {
            __emscripten_thread_exit(result2);
          }
        }
        finish(result);
      };
      var noExitRuntime = Module["noExitRuntime"] || true;
      var registerTLSInit = (tlsInitFunc) => PThread.tlsInitFunctions.push(tlsInitFunc);
      function setValue(ptr, value, type = "i8") {
        if (type.endsWith("*")) type = "*";
        switch (type) {
          case "i1":
            HEAP8[ptr] = value;
            break;
          case "i8":
            HEAP8[ptr] = value;
            break;
          case "i16":
            HEAP16[ptr >> 1] = value;
            break;
          case "i32":
            HEAP32[ptr >> 2] = value;
            break;
          case "i64":
            HEAP64[ptr >> 3] = BigInt(value);
            break;
          case "float":
            HEAPF32[ptr >> 2] = value;
            break;
          case "double":
            HEAPF64[ptr >> 3] = value;
            break;
          case "*":
            HEAPU32[ptr >> 2] = value;
            break;
          default:
            abort(`invalid type for setValue: ${type}`);
        }
      }
      var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
      var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
          return UTF8Decoder.decode(heapOrArray.buffer instanceof ArrayBuffer ? heapOrArray.subarray(idx, endPtr) : heapOrArray.slice(idx, endPtr));
        }
        var str = "";
        while (idx < endPtr) {
          var u0 = heapOrArray[idx++];
          if (!(u0 & 128)) {
            str += String.fromCharCode(u0);
            continue;
          }
          var u1 = heapOrArray[idx++] & 63;
          if ((u0 & 224) == 192) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
          }
          var u2 = heapOrArray[idx++] & 63;
          if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
          } else {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
          }
          if (u0 < 65536) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          }
        }
        return str;
      };
      var UTF8ToString = (ptr, maxBytesToRead) => {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      };
      var ___assert_fail = (condition, filename, line, func) => abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
      var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);
      function pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(2, 0, 1, pthread_ptr, attr, startRoutine, arg);
        return ___pthread_create_js(pthread_ptr, attr, startRoutine, arg);
      }
      var _emscripten_has_threading_support = () => typeof SharedArrayBuffer != "undefined";
      var ___pthread_create_js = (pthread_ptr, attr, startRoutine, arg) => {
        if (!_emscripten_has_threading_support()) {
          return 6;
        }
        var transferList = [];
        var error = 0;
        if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
          return pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg);
        }
        if (error) return error;
        var threadParams = {
          startRoutine,
          pthread_ptr,
          arg,
          transferList
        };
        if (ENVIRONMENT_IS_PTHREAD) {
          threadParams.cmd = "spawnThread";
          postMessage(threadParams, transferList);
          return 0;
        }
        return spawnThread(threadParams);
      };
      var syscallGetVarargI = () => {
        var ret = HEAP32[+SYSCALLS.varargs >> 2];
        SYSCALLS.varargs += 4;
        return ret;
      };
      var syscallGetVarargP = syscallGetVarargI;
      var PATH = {
        isAbs: (path) => path.charAt(0) === "/",
        splitPath: (filename) => {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        },
        normalizeArray: (parts, allowAboveRoot) => {
          var up = 0;
          for (var i2 = parts.length - 1; i2 >= 0; i2--) {
            var last = parts[i2];
            if (last === ".") {
              parts.splice(i2, 1);
            } else if (last === "..") {
              parts.splice(i2, 1);
              up++;
            } else if (up) {
              parts.splice(i2, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up; up--) {
              parts.unshift("..");
            }
          }
          return parts;
        },
        normalize: (path) => {
          var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
          path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        },
        dirname: (path) => {
          var result = PATH.splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            return ".";
          }
          if (dir) {
            dir = dir.slice(0, -1);
          }
          return root + dir;
        },
        basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
        join: (...paths) => PATH.normalize(paths.join("/")),
        join2: (l, r) => PATH.normalize(l + "/" + r)
      };
      var initRandomFill = () => {
        return (view) => view.set(crypto.getRandomValues(new Uint8Array(view.byteLength)));
      };
      var randomFill = (view) => {
        (randomFill = initRandomFill())(view);
      };
      var PATH_FS = {
        resolve: (...args) => {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i2 = args.length - 1; i2 >= -1 && !resolvedAbsolute; i2--) {
            var path = i2 >= 0 ? args[i2] : FS.cwd();
            if (typeof path != "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = PATH.isAbs(path);
          }
          resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        },
        relative: (from, to) => {
          from = PATH_FS.resolve(from).slice(1);
          to = PATH_FS.resolve(to).slice(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "") break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i2 = 0; i2 < length; i2++) {
            if (fromParts[i2] !== toParts[i2]) {
              samePartsLength = i2;
              break;
            }
          }
          var outputParts = [];
          for (var i2 = samePartsLength; i2 < fromParts.length; i2++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        }
      };
      var FS_stdin_getChar_buffer = [];
      var lengthBytesUTF8 = (str) => {
        var len = 0;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var c = str.charCodeAt(i2);
          if (c <= 127) {
            len++;
          } else if (c <= 2047) {
            len += 2;
          } else if (c >= 55296 && c <= 57343) {
            len += 4;
            ++i2;
          } else {
            len += 3;
          }
        }
        return len;
      };
      var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
        if (!(maxBytesToWrite > 0))
          return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var u = str.charCodeAt(i2);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i2);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx) break;
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      };
      var intArrayFromString = (stringy, dontAddNull, length) => {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull) u8array.length = numBytesWritten;
        return u8array;
      };
      var FS_stdin_getChar = () => {
        if (!FS_stdin_getChar_buffer.length) {
          var result = null;
          if (typeof window != "undefined" && typeof window.prompt == "function") {
            result = window.prompt("Input: ");
            if (result !== null) {
              result += "\n";
            }
          } else {
          }
          if (!result) {
            return null;
          }
          FS_stdin_getChar_buffer = intArrayFromString(result, true);
        }
        return FS_stdin_getChar_buffer.shift();
      };
      var TTY = {
        ttys: [],
        init() {
        },
        shutdown() {
        },
        register(dev, ops) {
          TTY.ttys[dev] = { input: [], output: [], ops };
          FS.registerDevice(dev, TTY.stream_ops);
        },
        stream_ops: {
          open(stream) {
            var tty = TTY.ttys[stream.node.rdev];
            if (!tty) {
              throw new FS.ErrnoError(43);
            }
            stream.tty = tty;
            stream.seekable = false;
          },
          close(stream) {
            stream.tty.ops.fsync(stream.tty);
          },
          fsync(stream) {
            stream.tty.ops.fsync(stream.tty);
          },
          read(stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.get_char) {
              throw new FS.ErrnoError(60);
            }
            var bytesRead = 0;
            for (var i2 = 0; i2 < length; i2++) {
              var result;
              try {
                result = stream.tty.ops.get_char(stream.tty);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0) break;
              bytesRead++;
              buffer[offset + i2] = result;
            }
            if (bytesRead) {
              stream.node.atime = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.put_char) {
              throw new FS.ErrnoError(60);
            }
            try {
              for (var i2 = 0; i2 < length; i2++) {
                stream.tty.ops.put_char(stream.tty, buffer[offset + i2]);
              }
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (length) {
              stream.node.mtime = stream.node.ctime = Date.now();
            }
            return i2;
          }
        },
        default_tty_ops: {
          get_char(tty) {
            return FS_stdin_getChar();
          },
          put_char(tty, val) {
            if (val === null || val === 10) {
              out(UTF8ArrayToString(tty.output));
              tty.output = [];
            } else {
              if (val != 0) tty.output.push(val);
            }
          },
          fsync(tty) {
            if (tty.output?.length > 0) {
              out(UTF8ArrayToString(tty.output));
              tty.output = [];
            }
          },
          ioctl_tcgets(tty) {
            return {
              c_iflag: 25856,
              c_oflag: 5,
              c_cflag: 191,
              c_lflag: 35387,
              c_cc: [
                3,
                28,
                127,
                21,
                4,
                0,
                1,
                0,
                17,
                19,
                26,
                0,
                18,
                15,
                23,
                22,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            };
          },
          ioctl_tcsets(tty, optional_actions, data) {
            return 0;
          },
          ioctl_tiocgwinsz(tty) {
            return [24, 80];
          }
        },
        default_tty1_ops: {
          put_char(tty, val) {
            if (val === null || val === 10) {
              err(UTF8ArrayToString(tty.output));
              tty.output = [];
            } else {
              if (val != 0) tty.output.push(val);
            }
          },
          fsync(tty) {
            if (tty.output?.length > 0) {
              err(UTF8ArrayToString(tty.output));
              tty.output = [];
            }
          }
        }
      };
      var zeroMemory = (address, size) => {
        HEAPU8.fill(0, address, address + size);
      };
      var alignMemory = (size, alignment) => {
        return Math.ceil(size / alignment) * alignment;
      };
      var mmapAlloc = (size) => {
        size = alignMemory(size, 65536);
        var ptr = _emscripten_builtin_memalign(65536, size);
        if (ptr) zeroMemory(ptr, size);
        return ptr;
      };
      var MEMFS = {
        ops_table: null,
        mount(mount) {
          return MEMFS.createNode(null, "/", 16895, 0);
        },
        createNode(parent, name, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63);
          }
          MEMFS.ops_table ||= {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
          var node = FS.createNode(parent, name, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = null;
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.atime = node.mtime = node.ctime = Date.now();
          if (parent) {
            parent.contents[name] = node;
            parent.atime = parent.mtime = parent.ctime = node.atime;
          }
          return node;
        },
        getFileDataAsTypedArray(node) {
          if (!node.contents) return new Uint8Array(0);
          if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
          return new Uint8Array(node.contents);
        },
        expandFileStorage(node, newCapacity) {
          var prevCapacity = node.contents ? node.contents.length : 0;
          if (prevCapacity >= newCapacity) return;
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity);
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
        },
        resizeFileStorage(node, newSize) {
          if (node.usedBytes == newSize) return;
          if (newSize == 0) {
            node.contents = null;
            node.usedBytes = 0;
          } else {
            var oldContents = node.contents;
            node.contents = new Uint8Array(newSize);
            if (oldContents) {
              node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
            }
            node.usedBytes = newSize;
          }
        },
        node_ops: {
          getattr(node) {
            var attr = {};
            attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
            attr.ino = node.id;
            attr.mode = node.mode;
            attr.nlink = 1;
            attr.uid = 0;
            attr.gid = 0;
            attr.rdev = node.rdev;
            if (FS.isDir(node.mode)) {
              attr.size = 4096;
            } else if (FS.isFile(node.mode)) {
              attr.size = node.usedBytes;
            } else if (FS.isLink(node.mode)) {
              attr.size = node.link.length;
            } else {
              attr.size = 0;
            }
            attr.atime = new Date(node.atime);
            attr.mtime = new Date(node.mtime);
            attr.ctime = new Date(node.ctime);
            attr.blksize = 4096;
            attr.blocks = Math.ceil(attr.size / attr.blksize);
            return attr;
          },
          setattr(node, attr) {
            for (const key of ["mode", "atime", "mtime", "ctime"]) {
              if (attr[key] != null) {
                node[key] = attr[key];
              }
            }
            if (attr.size !== void 0) {
              MEMFS.resizeFileStorage(node, attr.size);
            }
          },
          lookup(parent, name) {
            throw MEMFS.doesNotExistError;
          },
          mknod(parent, name, mode, dev) {
            return MEMFS.createNode(parent, name, mode, dev);
          },
          rename(old_node, new_dir, new_name) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              if (FS.isDir(old_node.mode)) {
                for (var i2 in new_node.contents) {
                  throw new FS.ErrnoError(55);
                }
              }
              FS.hashRemoveNode(new_node);
            }
            delete old_node.parent.contents[old_node.name];
            new_dir.contents[new_name] = old_node;
            old_node.name = new_name;
            new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
          },
          unlink(parent, name) {
            delete parent.contents[name];
            parent.ctime = parent.mtime = Date.now();
          },
          rmdir(parent, name) {
            var node = FS.lookupNode(parent, name);
            for (var i2 in node.contents) {
              throw new FS.ErrnoError(55);
            }
            delete parent.contents[name];
            parent.ctime = parent.mtime = Date.now();
          },
          readdir(node) {
            return [".", "..", ...Object.keys(node.contents)];
          },
          symlink(parent, newname, oldpath) {
            var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
            node.link = oldpath;
            return node;
          },
          readlink(node) {
            if (!FS.isLink(node.mode)) {
              throw new FS.ErrnoError(28);
            }
            return node.link;
          }
        },
        stream_ops: {
          read(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= stream.node.usedBytes) return 0;
            var size = Math.min(stream.node.usedBytes - position, length);
            if (size > 8 && contents.subarray) {
              buffer.set(contents.subarray(position, position + size), offset);
            } else {
              for (var i2 = 0; i2 < size; i2++) buffer[offset + i2] = contents[position + i2];
            }
            return size;
          },
          write(stream, buffer, offset, length, position, canOwn) {
            if (!length) return 0;
            var node = stream.node;
            node.mtime = node.ctime = Date.now();
            if (buffer.subarray && (!node.contents || node.contents.subarray)) {
              if (canOwn) {
                node.contents = buffer.subarray(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (node.usedBytes === 0 && position === 0) {
                node.contents = buffer.slice(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (position + length <= node.usedBytes) {
                node.contents.set(buffer.subarray(offset, offset + length), position);
                return length;
              }
            }
            MEMFS.expandFileStorage(node, position + length);
            if (node.contents.subarray && buffer.subarray) {
              node.contents.set(buffer.subarray(offset, offset + length), position);
            } else {
              for (var i2 = 0; i2 < length; i2++) {
                node.contents[position + i2] = buffer[offset + i2];
              }
            }
            node.usedBytes = Math.max(node.usedBytes, position + length);
            return length;
          },
          llseek(stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
              position += stream.position;
            } else if (whence === 2) {
              if (FS.isFile(stream.node.mode)) {
                position += stream.node.usedBytes;
              }
            }
            if (position < 0) {
              throw new FS.ErrnoError(28);
            }
            return position;
          },
          allocate(stream, offset, length) {
            MEMFS.expandFileStorage(stream.node, offset + length);
            stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
          },
          mmap(stream, length, position, prot, flags) {
            if (!FS.isFile(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            var ptr;
            var allocated;
            var contents = stream.node.contents;
            if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
              allocated = false;
              ptr = contents.byteOffset;
            } else {
              allocated = true;
              ptr = mmapAlloc(length);
              if (!ptr) {
                throw new FS.ErrnoError(48);
              }
              if (contents) {
                if (position > 0 || position + length < contents.length) {
                  if (contents.subarray) {
                    contents = contents.subarray(position, position + length);
                  } else {
                    contents = Array.prototype.slice.call(contents, position, position + length);
                  }
                }
                HEAP8.set(contents, ptr);
              }
            }
            return { ptr, allocated };
          },
          msync(stream, buffer, offset, length, mmapFlags) {
            MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
            return 0;
          }
        }
      };
      var asyncLoad = async (url) => {
        var arrayBuffer = await readAsync(url);
        return new Uint8Array(arrayBuffer);
      };
      var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
        FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
      };
      var preloadPlugins = Module["preloadPlugins"] || [];
      var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
        if (typeof Browser != "undefined") Browser.init();
        var handled = false;
        preloadPlugins.forEach((plugin) => {
          if (handled) return;
          if (plugin["canHandle"](fullname)) {
            plugin["handle"](byteArray, fullname, finish, onerror);
            handled = true;
          }
        });
        return handled;
      };
      var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency(`cp ${fullname}`);
        function processData(byteArray) {
          function finish(byteArray2) {
            preFinish?.();
            if (!dontCreateFile) {
              FS_createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
            }
            onload?.();
            removeRunDependency(dep);
          }
          if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
            onerror?.();
            removeRunDependency(dep);
          })) {
            return;
          }
          finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == "string") {
          asyncLoad(url).then(processData, onerror);
        } else {
          processData(url);
        }
      };
      var FS_modeStringToFlags = (str) => {
        var flagModes = {
          "r": 0,
          "r+": 2,
          "w": 512 | 64 | 1,
          "w+": 512 | 64 | 2,
          "a": 1024 | 64 | 1,
          "a+": 1024 | 64 | 2
        };
        var flags = flagModes[str];
        if (typeof flags == "undefined") {
          throw new Error(`Unknown file open mode: ${str}`);
        }
        return flags;
      };
      var FS_getMode = (canRead, canWrite) => {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      };
      var IDBFS = {
        dbs: {},
        indexedDB: () => {
          if (typeof indexedDB != "undefined") return indexedDB;
          var ret = null;
          if (typeof window == "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
          return ret;
        },
        DB_VERSION: 21,
        DB_STORE_NAME: "FILE_DATA",
        queuePersist: (mount) => {
          function onPersistComplete() {
            if (mount.idbPersistState === "again") startPersist();
            else mount.idbPersistState = 0;
          }
          function startPersist() {
            mount.idbPersistState = "idb";
            IDBFS.syncfs(
              mount,
              /*populate:*/
              false,
              onPersistComplete
            );
          }
          if (!mount.idbPersistState) {
            mount.idbPersistState = setTimeout(startPersist, 0);
          } else if (mount.idbPersistState === "idb") {
            mount.idbPersistState = "again";
          }
        },
        mount: (mount) => {
          var mnt = MEMFS.mount(mount);
          if (mount?.opts?.autoPersist) {
            mnt.idbPersistState = 0;
            var memfs_node_ops = mnt.node_ops;
            mnt.node_ops = Object.assign({}, mnt.node_ops);
            mnt.node_ops.mknod = (parent, name, mode, dev) => {
              var node = memfs_node_ops.mknod(parent, name, mode, dev);
              node.node_ops = mnt.node_ops;
              node.idbfs_mount = mnt.mount;
              node.memfs_stream_ops = node.stream_ops;
              node.stream_ops = Object.assign({}, node.stream_ops);
              node.stream_ops.write = (stream, buffer, offset, length, position, canOwn) => {
                stream.node.isModified = true;
                return node.memfs_stream_ops.write(stream, buffer, offset, length, position, canOwn);
              };
              node.stream_ops.close = (stream) => {
                var n = stream.node;
                if (n.isModified) {
                  IDBFS.queuePersist(n.idbfs_mount);
                  n.isModified = false;
                }
                if (n.memfs_stream_ops.close) return n.memfs_stream_ops.close(stream);
              };
              return node;
            };
            mnt.node_ops.mkdir = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.mkdir(...args));
            mnt.node_ops.rmdir = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rmdir(...args));
            mnt.node_ops.symlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.symlink(...args));
            mnt.node_ops.unlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.unlink(...args));
            mnt.node_ops.rename = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rename(...args));
          }
          return mnt;
        },
        syncfs: (mount, populate, callback) => {
          IDBFS.getLocalSet(mount, (err2, local) => {
            if (err2) return callback(err2);
            IDBFS.getRemoteSet(mount, (err3, remote) => {
              if (err3) return callback(err3);
              var src = populate ? remote : local;
              var dst = populate ? local : remote;
              IDBFS.reconcile(src, dst, callback);
            });
          });
        },
        quit: () => {
          Object.values(IDBFS.dbs).forEach((value) => value.close());
          IDBFS.dbs = {};
        },
        getDB: (name, callback) => {
          var db = IDBFS.dbs[name];
          if (db) {
            return callback(null, db);
          }
          var req;
          try {
            req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
          } catch (e) {
            return callback(e);
          }
          if (!req) {
            return callback("Unable to connect to IndexedDB");
          }
          req.onupgradeneeded = (e) => {
            var db2 = (
              /** @type {IDBDatabase} */
              e.target.result
            );
            var transaction = e.target.transaction;
            var fileStore;
            if (db2.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
              fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
            } else {
              fileStore = db2.createObjectStore(IDBFS.DB_STORE_NAME);
            }
            if (!fileStore.indexNames.contains("timestamp")) {
              fileStore.createIndex("timestamp", "timestamp", { unique: false });
            }
          };
          req.onsuccess = () => {
            db = /** @type {IDBDatabase} */
            req.result;
            IDBFS.dbs[name] = db;
            callback(null, db);
          };
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        getLocalSet: (mount, callback) => {
          var entries = {};
          function isRealDir(p) {
            return p !== "." && p !== "..";
          }
          ;
          function toAbsolute(root) {
            return (p) => PATH.join2(root, p);
          }
          ;
          var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
          while (check.length) {
            var path = check.pop();
            var stat;
            try {
              stat = FS.stat(path);
            } catch (e) {
              return callback(e);
            }
            if (FS.isDir(stat.mode)) {
              check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
            }
            entries[path] = { "timestamp": stat.mtime };
          }
          return callback(null, { type: "local", entries });
        },
        getRemoteSet: (mount, callback) => {
          var entries = {};
          IDBFS.getDB(mount.mountpoint, (err2, db) => {
            if (err2) return callback(err2);
            try {
              var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");
              transaction.onerror = (e) => {
                callback(e.target.error);
                e.preventDefault();
              };
              var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
              var index = store.index("timestamp");
              index.openKeyCursor().onsuccess = (event2) => {
                var cursor = event2.target.result;
                if (!cursor) {
                  return callback(null, { type: "remote", db, entries });
                }
                entries[cursor.primaryKey] = { "timestamp": cursor.key };
                cursor.continue();
              };
            } catch (e) {
              return callback(e);
            }
          });
        },
        loadLocalEntry: (path, callback) => {
          var stat, node;
          try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
          if (FS.isDir(stat.mode)) {
            return callback(null, { "timestamp": stat.mtime, "mode": stat.mode });
          } else if (FS.isFile(stat.mode)) {
            node.contents = MEMFS.getFileDataAsTypedArray(node);
            return callback(null, { "timestamp": stat.mtime, "mode": stat.mode, "contents": node.contents });
          } else {
            return callback(new Error("node type not supported"));
          }
        },
        storeLocalEntry: (path, entry, callback) => {
          try {
            if (FS.isDir(entry["mode"])) {
              FS.mkdirTree(path, entry["mode"]);
            } else if (FS.isFile(entry["mode"])) {
              FS.writeFile(path, entry["contents"], { canOwn: true });
            } else {
              return callback(new Error("node type not supported"));
            }
            FS.chmod(path, entry["mode"]);
            FS.utime(path, entry["timestamp"], entry["timestamp"]);
          } catch (e) {
            return callback(e);
          }
          callback(null);
        },
        removeLocalEntry: (path, callback) => {
          try {
            var stat = FS.stat(path);
            if (FS.isDir(stat.mode)) {
              FS.rmdir(path);
            } else if (FS.isFile(stat.mode)) {
              FS.unlink(path);
            }
          } catch (e) {
            return callback(e);
          }
          callback(null);
        },
        loadRemoteEntry: (store, path, callback) => {
          var req = store.get(path);
          req.onsuccess = (event2) => callback(null, event2.target.result);
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        storeRemoteEntry: (store, path, entry, callback) => {
          try {
            var req = store.put(entry, path);
          } catch (e) {
            callback(e);
            return;
          }
          req.onsuccess = (event2) => callback();
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        removeRemoteEntry: (store, path, callback) => {
          var req = store.delete(path);
          req.onsuccess = (event2) => callback();
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        reconcile: (src, dst, callback) => {
          var total = 0;
          var create = [];
          Object.keys(src.entries).forEach((key) => {
            var e = src.entries[key];
            var e2 = dst.entries[key];
            if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
              create.push(key);
              total++;
            }
          });
          var remove = [];
          Object.keys(dst.entries).forEach((key) => {
            if (!src.entries[key]) {
              remove.push(key);
              total++;
            }
          });
          if (!total) {
            return callback(null);
          }
          var errored = false;
          var db = src.type === "remote" ? src.db : dst.db;
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          function done(err2) {
            if (err2 && !errored) {
              errored = true;
              return callback(err2);
            }
          }
          ;
          transaction.onerror = transaction.onabort = (e) => {
            done(e.target.error);
            e.preventDefault();
          };
          transaction.oncomplete = (e) => {
            if (!errored) {
              callback(null);
            }
          };
          create.sort().forEach((path) => {
            if (dst.type === "local") {
              IDBFS.loadRemoteEntry(store, path, (err2, entry) => {
                if (err2) return done(err2);
                IDBFS.storeLocalEntry(path, entry, done);
              });
            } else {
              IDBFS.loadLocalEntry(path, (err2, entry) => {
                if (err2) return done(err2);
                IDBFS.storeRemoteEntry(store, path, entry, done);
              });
            }
          });
          remove.sort().reverse().forEach((path) => {
            if (dst.type === "local") {
              IDBFS.removeLocalEntry(path, done);
            } else {
              IDBFS.removeRemoteEntry(store, path, done);
            }
          });
        }
      };
      var FS = {
        root: null,
        mounts: [],
        devices: {},
        streams: [],
        nextInode: 1,
        nameTable: null,
        currentPath: "/",
        initialized: false,
        ignorePermissions: true,
        filesystems: null,
        syncFSRequests: 0,
        readFiles: {},
        ErrnoError: class {
          name = "ErrnoError";
          // We set the `name` property to be able to identify `FS.ErrnoError`
          // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
          // - when using PROXYFS, an error can come from an underlying FS
          // as different FS objects have their own FS.ErrnoError each,
          // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
          // we'll use the reliable test `err.name == "ErrnoError"` instead
          constructor(errno) {
            this.errno = errno;
          }
        },
        FSStream: class {
          shared = {};
          get object() {
            return this.node;
          }
          set object(val) {
            this.node = val;
          }
          get isRead() {
            return (this.flags & 2097155) !== 1;
          }
          get isWrite() {
            return (this.flags & 2097155) !== 0;
          }
          get isAppend() {
            return this.flags & 1024;
          }
          get flags() {
            return this.shared.flags;
          }
          set flags(val) {
            this.shared.flags = val;
          }
          get position() {
            return this.shared.position;
          }
          set position(val) {
            this.shared.position = val;
          }
        },
        FSNode: class {
          node_ops = {};
          stream_ops = {};
          readMode = 292 | 73;
          writeMode = 146;
          mounted = null;
          constructor(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.rdev = rdev;
            this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(val) {
            val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(val) {
            val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return FS.isDir(this.mode);
          }
          get isDevice() {
            return FS.isChrdev(this.mode);
          }
        },
        lookupPath(path, opts = {}) {
          if (!path) {
            throw new FS.ErrnoError(44);
          }
          opts.follow_mount ??= true;
          if (!PATH.isAbs(path)) {
            path = FS.cwd() + "/" + path;
          }
          linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
            var parts = path.split("/").filter((p) => !!p);
            var current = FS.root;
            var current_path = "/";
            for (var i2 = 0; i2 < parts.length; i2++) {
              var islast = i2 === parts.length - 1;
              if (islast && opts.parent) {
                break;
              }
              if (parts[i2] === ".") {
                continue;
              }
              if (parts[i2] === "..") {
                current_path = PATH.dirname(current_path);
                current = current.parent;
                continue;
              }
              current_path = PATH.join2(current_path, parts[i2]);
              try {
                current = FS.lookupNode(current, parts[i2]);
              } catch (e) {
                if (e?.errno === 44 && islast && opts.noent_okay) {
                  return { path: current_path };
                }
                throw e;
              }
              if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
                current = current.mounted.root;
              }
              if (FS.isLink(current.mode) && (!islast || opts.follow)) {
                if (!current.node_ops.readlink) {
                  throw new FS.ErrnoError(52);
                }
                var link = current.node_ops.readlink(current);
                if (!PATH.isAbs(link)) {
                  link = PATH.dirname(current_path) + "/" + link;
                }
                path = link + "/" + parts.slice(i2 + 1).join("/");
                continue linkloop;
              }
            }
            return { path: current_path, node: current };
          }
          throw new FS.ErrnoError(32);
        },
        getPath(node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path) return mount;
              return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
            }
            path = path ? `${node.name}/${path}` : node.name;
            node = node.parent;
          }
        },
        hashName(parentid, name) {
          var hash = 0;
          for (var i2 = 0; i2 < name.length; i2++) {
            hash = (hash << 5) - hash + name.charCodeAt(i2) | 0;
          }
          return (parentid + hash >>> 0) % FS.nameTable.length;
        },
        hashAddNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash];
          FS.nameTable[hash] = node;
        },
        hashRemoveNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
          } else {
            var current = FS.nameTable[hash];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        },
        lookupNode(parent, name) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          var hash = FS.hashName(parent.id, name);
          for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
              return node;
            }
          }
          return FS.lookup(parent, name);
        },
        createNode(parent, name, mode, rdev) {
          var node = new FS.FSNode(parent, name, mode, rdev);
          FS.hashAddNode(node);
          return node;
        },
        destroyNode(node) {
          FS.hashRemoveNode(node);
        },
        isRoot(node) {
          return node === node.parent;
        },
        isMountpoint(node) {
          return !!node.mounted;
        },
        isFile(mode) {
          return (mode & 61440) === 32768;
        },
        isDir(mode) {
          return (mode & 61440) === 16384;
        },
        isLink(mode) {
          return (mode & 61440) === 40960;
        },
        isChrdev(mode) {
          return (mode & 61440) === 8192;
        },
        isBlkdev(mode) {
          return (mode & 61440) === 24576;
        },
        isFIFO(mode) {
          return (mode & 61440) === 4096;
        },
        isSocket(mode) {
          return (mode & 49152) === 49152;
        },
        flagsToPermissionString(flag) {
          var perms = ["r", "w", "rw"][flag & 3];
          if (flag & 512) {
            perms += "w";
          }
          return perms;
        },
        nodePermissions(node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          if (perms.includes("r") && !(node.mode & 292)) {
            return 2;
          } else if (perms.includes("w") && !(node.mode & 146)) {
            return 2;
          } else if (perms.includes("x") && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        },
        mayLookup(dir) {
          if (!FS.isDir(dir.mode)) return 54;
          var errCode = FS.nodePermissions(dir, "x");
          if (errCode) return errCode;
          if (!dir.node_ops.lookup) return 2;
          return 0;
        },
        mayCreate(dir, name) {
          if (!FS.isDir(dir.mode)) {
            return 54;
          }
          try {
            var node = FS.lookupNode(dir, name);
            return 20;
          } catch (e) {
          }
          return FS.nodePermissions(dir, "wx");
        },
        mayDelete(dir, name, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name);
          } catch (e) {
            return e.errno;
          }
          var errCode = FS.nodePermissions(dir, "wx");
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else {
            if (FS.isDir(node.mode)) {
              return 31;
            }
          }
          return 0;
        },
        mayOpen(node, flags) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== "r" || flags & (512 | 64)) {
              return 31;
            }
          }
          return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
        },
        checkOpExists(op, err2) {
          if (!op) {
            throw new FS.ErrnoError(err2);
          }
          return op;
        },
        MAX_OPEN_FDS: 4096,
        nextfd() {
          for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        },
        getStreamChecked(fd) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          return stream;
        },
        getStream: (fd) => FS.streams[fd],
        createStream(stream, fd = -1) {
          stream = Object.assign(new FS.FSStream(), stream);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        },
        closeStream(fd) {
          FS.streams[fd] = null;
        },
        dupStream(origStream, fd = -1) {
          var stream = FS.createStream(origStream, fd);
          stream.stream_ops?.dup?.(stream);
          return stream;
        },
        doSetAttr(stream, node, attr) {
          var setattr = stream?.stream_ops.setattr;
          var arg = setattr ? stream : node;
          setattr ??= node.node_ops.setattr;
          FS.checkOpExists(setattr, 63);
          setattr(arg, attr);
        },
        chrdev_stream_ops: {
          open(stream) {
            var device = FS.getDevice(stream.node.rdev);
            stream.stream_ops = device.stream_ops;
            stream.stream_ops.open?.(stream);
          },
          llseek() {
            throw new FS.ErrnoError(70);
          }
        },
        major: (dev) => dev >> 8,
        minor: (dev) => dev & 255,
        makedev: (ma, mi) => ma << 8 | mi,
        registerDevice(dev, ops) {
          FS.devices[dev] = { stream_ops: ops };
        },
        getDevice: (dev) => FS.devices[dev],
        getMounts(mount) {
          var mounts = [];
          var check = [mount];
          while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push(...m.mounts);
          }
          return mounts;
        },
        syncfs(populate, callback) {
          if (typeof populate == "function") {
            callback = populate;
            populate = false;
          }
          FS.syncFSRequests++;
          if (FS.syncFSRequests > 1) {
            err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          }
          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;
          function doCallback(errCode) {
            FS.syncFSRequests--;
            return callback(errCode);
          }
          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          ;
          mounts.forEach((mount) => {
            if (!mount.type.syncfs) {
              return done(null);
            }
            mount.type.syncfs(mount, populate, done);
          });
        },
        mount(type, opts, mountpoint) {
          var root = mountpoint === "/";
          var pseudo = !mountpoint;
          var node;
          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }
          var mount = {
            type,
            opts,
            mountpoint,
            mounts: []
          };
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;
          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            node.mounted = mount;
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }
          return mountRoot;
        },
        unmount(mountpoint) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28);
          }
          var node = lookup.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);
          Object.keys(FS.nameTable).forEach((hash) => {
            var current = FS.nameTable[hash];
            while (current) {
              var next = current.name_next;
              if (mounts.includes(current.mount)) {
                FS.destroyNode(current);
              }
              current = next;
            }
          });
          node.mounted = null;
          var idx = node.mount.mounts.indexOf(mount);
          node.mount.mounts.splice(idx, 1);
        },
        lookup(parent, name) {
          return parent.node_ops.lookup(parent, name);
        },
        mknod(path, mode, dev) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          if (!name) {
            throw new FS.ErrnoError(28);
          }
          if (name === "." || name === "..") {
            throw new FS.ErrnoError(20);
          }
          var errCode = FS.mayCreate(parent, name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name, mode, dev);
        },
        statfs(path) {
          return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
        },
        statfsStream(stream) {
          return FS.statfsNode(stream.node);
        },
        statfsNode(node) {
          var rtn = {
            bsize: 4096,
            frsize: 4096,
            blocks: 1e6,
            bfree: 5e5,
            bavail: 5e5,
            files: FS.nextInode,
            ffree: FS.nextInode - 1,
            fsid: 42,
            flags: 2,
            namelen: 255
          };
          if (node.node_ops.statfs) {
            Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
          }
          return rtn;
        },
        create(path, mode = 438) {
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        },
        mkdir(path, mode = 511) {
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        },
        mkdirTree(path, mode) {
          var dirs = path.split("/");
          var d = "";
          for (var i2 = 0; i2 < dirs.length; ++i2) {
            if (!dirs[i2]) continue;
            d += "/" + dirs[i2];
            try {
              FS.mkdir(d, mode);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
          }
        },
        mkdev(path, mode, dev) {
          if (typeof dev == "undefined") {
            dev = mode;
            mode = 438;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        },
        symlink(oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup = FS.lookupPath(newpath, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        },
        rename(old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          var lookup, old_dir, new_dir;
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
          if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          var old_node = FS.lookupNode(old_dir, old_name);
          var relative = PATH_FS.relative(old_path, new_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(28);
          }
          relative = PATH_FS.relative(new_path, old_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(55);
          }
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (old_node === new_node) {
            return;
          }
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10);
          }
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          FS.hashRemoveNode(old_node);
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
            old_node.parent = new_dir;
          } catch (e) {
            throw e;
          } finally {
            FS.hashAddNode(old_node);
          }
        },
        rmdir(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.rmdir(parent, name);
          FS.destroyNode(node);
        },
        readdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
          return readdir(node);
        },
        unlink(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, false);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.unlink(parent, name);
          FS.destroyNode(node);
        },
        readlink(path) {
          var lookup = FS.lookupPath(path);
          var link = lookup.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return link.node_ops.readlink(link);
        },
        stat(path, dontFollow) {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          var node = lookup.node;
          var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
          return getattr(node);
        },
        fstat(fd) {
          var stream = FS.getStreamChecked(fd);
          var node = stream.node;
          var getattr = stream.stream_ops.getattr;
          var arg = getattr ? stream : node;
          getattr ??= node.node_ops.getattr;
          FS.checkOpExists(getattr, 63);
          return getattr(arg);
        },
        lstat(path) {
          return FS.stat(path, true);
        },
        doChmod(stream, node, mode, dontFollow) {
          FS.doSetAttr(stream, node, {
            mode: mode & 4095 | node.mode & ~4095,
            ctime: Date.now(),
            dontFollow
          });
        },
        chmod(path, mode, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChmod(null, node, mode, dontFollow);
        },
        lchmod(path, mode) {
          FS.chmod(path, mode, true);
        },
        fchmod(fd, mode) {
          var stream = FS.getStreamChecked(fd);
          FS.doChmod(stream, stream.node, mode, false);
        },
        doChown(stream, node, dontFollow) {
          FS.doSetAttr(stream, node, {
            timestamp: Date.now(),
            dontFollow
            // we ignore the uid / gid for now
          });
        },
        chown(path, uid, gid, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChown(null, node, dontFollow);
        },
        lchown(path, uid, gid) {
          FS.chown(path, uid, gid, true);
        },
        fchown(fd, uid, gid) {
          var stream = FS.getStreamChecked(fd);
          FS.doChown(stream, stream.node, false);
        },
        doTruncate(stream, node, len) {
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.doSetAttr(stream, node, {
            size: len,
            timestamp: Date.now()
          });
        },
        truncate(path, len) {
          if (len < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doTruncate(null, node, len);
        },
        ftruncate(fd, len) {
          var stream = FS.getStreamChecked(fd);
          if (len < 0 || (stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.doTruncate(stream, stream.node, len);
        },
        utime(path, atime, mtime) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
          setattr(node, {
            atime,
            mtime
          });
        },
        open(path, flags, mode = 438) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
          if (flags & 64) {
            mode = mode & 4095 | 32768;
          } else {
            mode = 0;
          }
          var node;
          var isDirPath;
          if (typeof path == "object") {
            node = path;
          } else {
            isDirPath = path.endsWith("/");
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072),
              noent_okay: true
            });
            node = lookup.node;
            path = lookup.path;
          }
          var created = false;
          if (flags & 64) {
            if (node) {
              if (flags & 128) {
                throw new FS.ErrnoError(20);
              }
            } else if (isDirPath) {
              throw new FS.ErrnoError(31);
            } else {
              node = FS.mknod(path, mode | 511, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (FS.isChrdev(node.mode)) {
            flags &= ~512;
          }
          if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          if (flags & 512 && !created) {
            FS.truncate(node, 0);
          }
          flags &= ~(128 | 512 | 131072);
          var stream = FS.createStream({
            node,
            path: FS.getPath(node),
            // we want the absolute path to the node
            flags,
            seekable: true,
            position: 0,
            stream_ops: node.stream_ops,
            // used by the file family libc calls (fopen, fwrite, ferror, etc.)
            ungotten: [],
            error: false
          });
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (created) {
            FS.chmod(node, mode & 511);
          }
          if (Module["logReadFiles"] && !(flags & 1)) {
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
            }
          }
          return stream;
        },
        close(stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents) stream.getdents = null;
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        },
        isClosed(stream) {
          return stream.fd === null;
        },
        llseek(stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        },
        read(stream, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
          if (!seeking) stream.position += bytesRead;
          return bytesRead;
        },
        write(stream, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
          if (!seeking) stream.position += bytesWritten;
          return bytesWritten;
        },
        allocate(stream, offset, length) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (offset < 0 || length <= 0) {
            throw new FS.ErrnoError(28);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (!stream.stream_ops.allocate) {
            throw new FS.ErrnoError(138);
          }
          stream.stream_ops.allocate(stream, offset, length);
        },
        mmap(stream, length, position, prot, flags) {
          if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          if (!length) {
            throw new FS.ErrnoError(28);
          }
          return stream.stream_ops.mmap(stream, length, position, prot, flags);
        },
        msync(stream, buffer, offset, length, mmapFlags) {
          if (!stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
        },
        ioctl(stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        },
        readFile(path, opts = {}) {
          opts.flags = opts.flags || 0;
          opts.encoding = opts.encoding || "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error(`Invalid encoding type "${opts.encoding}"`);
          }
          var ret;
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            ret = UTF8ArrayToString(buf);
          } else if (opts.encoding === "binary") {
            ret = buf;
          }
          FS.close(stream);
          return ret;
        },
        writeFile(path, data, opts = {}) {
          opts.flags = opts.flags || 577;
          var stream = FS.open(path, opts.flags, opts.mode);
          if (typeof data == "string") {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
          } else if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
          } else {
            throw new Error("Unsupported data type");
          }
          FS.close(stream);
        },
        cwd: () => FS.currentPath,
        chdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          if (lookup.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup.node, "x");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup.path;
        },
        createDefaultDirectories() {
          FS.mkdir("/tmp");
          FS.mkdir("/home");
          FS.mkdir("/home/web_user");
        },
        createDefaultDevices() {
          FS.mkdir("/dev");
          FS.registerDevice(FS.makedev(1, 3), {
            read: () => 0,
            write: (stream, buffer, offset, length, pos) => length,
            llseek: () => 0
          });
          FS.mkdev("/dev/null", FS.makedev(1, 3));
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev("/dev/tty", FS.makedev(5, 0));
          FS.mkdev("/dev/tty1", FS.makedev(6, 0));
          var randomBuffer = new Uint8Array(1024), randomLeft = 0;
          var randomByte = () => {
            if (randomLeft === 0) {
              randomFill(randomBuffer);
              randomLeft = randomBuffer.byteLength;
            }
            return randomBuffer[--randomLeft];
          };
          FS.createDevice("/dev", "random", randomByte);
          FS.createDevice("/dev", "urandom", randomByte);
          FS.mkdir("/dev/shm");
          FS.mkdir("/dev/shm/tmp");
        },
        createSpecialDirectories() {
          FS.mkdir("/proc");
          var proc_self = FS.mkdir("/proc/self");
          FS.mkdir("/proc/self/fd");
          FS.mount({
            mount() {
              var node = FS.createNode(proc_self, "fd", 16895, 73);
              node.stream_ops = {
                llseek: MEMFS.stream_ops.llseek
              };
              node.node_ops = {
                lookup(parent, name) {
                  var fd = +name;
                  var stream = FS.getStreamChecked(fd);
                  var ret = {
                    parent: null,
                    mount: { mountpoint: "fake" },
                    node_ops: { readlink: () => stream.path },
                    id: fd + 1
                  };
                  ret.parent = ret;
                  return ret;
                },
                readdir() {
                  return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
                }
              };
              return node;
            }
          }, {}, "/proc/self/fd");
        },
        createStandardStreams(input, output, error) {
          if (input) {
            FS.createDevice("/dev", "stdin", input);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (output) {
            FS.createDevice("/dev", "stdout", null, output);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (error) {
            FS.createDevice("/dev", "stderr", null, error);
          } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
          }
          var stdin = FS.open("/dev/stdin", 0);
          var stdout = FS.open("/dev/stdout", 1);
          var stderr = FS.open("/dev/stderr", 1);
        },
        staticInit() {
          FS.nameTable = new Array(4096);
          FS.mount(MEMFS, {}, "/");
          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();
          FS.filesystems = {
            "MEMFS": MEMFS,
            "IDBFS": IDBFS
          };
        },
        init(input, output, error) {
          FS.initialized = true;
          input ??= Module["stdin"];
          output ??= Module["stdout"];
          error ??= Module["stderr"];
          FS.createStandardStreams(input, output, error);
        },
        quit() {
          FS.initialized = false;
          for (var i2 = 0; i2 < FS.streams.length; i2++) {
            var stream = FS.streams[i2];
            if (!stream) {
              continue;
            }
            FS.close(stream);
          }
        },
        findObject(path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (!ret.exists) {
            return null;
          }
          return ret.object;
        },
        analyzePath(path, dontResolveLastLink) {
          try {
            var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            path = lookup.path;
          } catch (e) {
          }
          var ret = {
            isRoot: false,
            exists: false,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: false,
            parentPath: null,
            parentObject: null
          };
          try {
            var lookup = FS.lookupPath(path, { parent: true });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/";
          } catch (e) {
            ret.error = e.errno;
          }
          ;
          return ret;
        },
        createPath(parent, path, canRead, canWrite) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          var parts = path.split("/").reverse();
          while (parts.length) {
            var part = parts.pop();
            if (!part) continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
            parent = current;
          }
          return current;
        },
        createFile(parent, name, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(canRead, canWrite);
          return FS.create(path, mode);
        },
        createDataFile(parent, name, data, canRead, canWrite, canOwn) {
          var path = name;
          if (parent) {
            parent = typeof parent == "string" ? parent : FS.getPath(parent);
            path = name ? PATH.join2(parent, name) : parent;
          }
          var mode = FS_getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            if (typeof data == "string") {
              var arr = new Array(data.length);
              for (var i2 = 0, len = data.length; i2 < len; ++i2) arr[i2] = data.charCodeAt(i2);
              data = arr;
            }
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 577);
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
        },
        createDevice(parent, name, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(!!input, !!output);
          FS.createDevice.major ??= 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, {
            open(stream) {
              stream.seekable = false;
            },
            close(stream) {
              if (output?.buffer?.length) {
                output(10);
              }
            },
            read(stream, buffer, offset, length, pos) {
              var bytesRead = 0;
              for (var i2 = 0; i2 < length; i2++) {
                var result;
                try {
                  result = input();
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
                if (result === void 0 && bytesRead === 0) {
                  throw new FS.ErrnoError(6);
                }
                if (result === null || result === void 0) break;
                bytesRead++;
                buffer[offset + i2] = result;
              }
              if (bytesRead) {
                stream.node.atime = Date.now();
              }
              return bytesRead;
            },
            write(stream, buffer, offset, length, pos) {
              for (var i2 = 0; i2 < length; i2++) {
                try {
                  output(buffer[offset + i2]);
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
              }
              if (length) {
                stream.node.mtime = stream.node.ctime = Date.now();
              }
              return i2;
            }
          });
          return FS.mkdev(path, mode, dev);
        },
        forceLoadFile(obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
          if (typeof XMLHttpRequest != "undefined") {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else {
            try {
              obj.contents = readBinary(obj.url);
              obj.usedBytes = obj.contents.length;
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          }
        },
        createLazyFile(parent, name, url, canRead, canWrite) {
          class LazyUint8Array {
            lengthKnown = false;
            chunks = [];
            // Loaded chunks. Index is the chunk number
            get(idx) {
              if (idx > this.length - 1 || idx < 0) {
                return void 0;
              }
              var chunkOffset = idx % this.chunkSize;
              var chunkNum = idx / this.chunkSize | 0;
              return this.getter(chunkNum)[chunkOffset];
            }
            setDataGetter(getter) {
              this.getter = getter;
            }
            cacheLength() {
              var xhr = new XMLHttpRequest();
              xhr.open("HEAD", url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
              var chunkSize = 1024 * 1024;
              if (!hasByteServing) chunkSize = datalength;
              var doXHR = (from, to) => {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, false);
                if (datalength !== chunkSize) xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
                xhr2.responseType = "arraybuffer";
                if (xhr2.overrideMimeType) {
                  xhr2.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr2.send(null);
                if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
                if (xhr2.response !== void 0) {
                  return new Uint8Array(
                    /** @type{Array<number>} */
                    xhr2.response || []
                  );
                }
                return intArrayFromString(xhr2.responseText || "", true);
              };
              var lazyArray2 = this;
              lazyArray2.setDataGetter((chunkNum) => {
                var start = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
                  lazyArray2.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
                return lazyArray2.chunks[chunkNum];
              });
              if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
              }
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
            }
            get length() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
            get chunkSize() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
          if (typeof XMLHttpRequest != "undefined") {
            if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var lazyArray = new LazyUint8Array();
            var properties = { isDevice: false, contents: lazyArray };
          } else {
            var properties = { isDevice: false, url };
          }
          var node = FS.createFile(parent, name, properties, canRead, canWrite);
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          Object.defineProperties(node, {
            usedBytes: {
              get: function() {
                return this.contents.length;
              }
            }
          });
          var stream_ops = {};
          var keys = Object.keys(node.stream_ops);
          keys.forEach((key) => {
            var fn = node.stream_ops[key];
            stream_ops[key] = (...args) => {
              FS.forceLoadFile(node);
              return fn(...args);
            };
          });
          function writeChunks(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= contents.length)
              return 0;
            var size = Math.min(contents.length - position, length);
            if (contents.slice) {
              for (var i2 = 0; i2 < size; i2++) {
                buffer[offset + i2] = contents[position + i2];
              }
            } else {
              for (var i2 = 0; i2 < size; i2++) {
                buffer[offset + i2] = contents.get(position + i2);
              }
            }
            return size;
          }
          stream_ops.read = (stream, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream, buffer, offset, length, position);
          };
          stream_ops.mmap = (stream, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream, HEAP8, ptr, length, position);
            return { ptr, allocated: true };
          };
          node.stream_ops = stream_ops;
          return node;
        }
      };
      var SYSCALLS = {
        DEFAULT_POLLMASK: 5,
        calculateAt(dirfd, path, allowEmpty) {
          if (PATH.isAbs(path)) {
            return path;
          }
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = SYSCALLS.getStreamFromFD(dirfd);
            dir = dirstream.path;
          }
          if (path.length == 0) {
            if (!allowEmpty) {
              throw new FS.ErrnoError(44);
              ;
            }
            return dir;
          }
          return dir + "/" + path;
        },
        writeStat(buf, stat) {
          HEAP32[buf >> 2] = stat.dev;
          HEAP32[buf + 4 >> 2] = stat.mode;
          HEAPU32[buf + 8 >> 2] = stat.nlink;
          HEAP32[buf + 12 >> 2] = stat.uid;
          HEAP32[buf + 16 >> 2] = stat.gid;
          HEAP32[buf + 20 >> 2] = stat.rdev;
          HEAP64[buf + 24 >> 3] = BigInt(stat.size);
          HEAP32[buf + 32 >> 2] = 4096;
          HEAP32[buf + 36 >> 2] = stat.blocks;
          var atime = stat.atime.getTime();
          var mtime = stat.mtime.getTime();
          var ctime = stat.ctime.getTime();
          HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
          HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
          HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
          HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
          HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
          HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
          HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
          return 0;
        },
        writeStatFs(buf, stats) {
          HEAP32[buf + 4 >> 2] = stats.bsize;
          HEAP32[buf + 40 >> 2] = stats.bsize;
          HEAP32[buf + 8 >> 2] = stats.blocks;
          HEAP32[buf + 12 >> 2] = stats.bfree;
          HEAP32[buf + 16 >> 2] = stats.bavail;
          HEAP32[buf + 20 >> 2] = stats.files;
          HEAP32[buf + 24 >> 2] = stats.ffree;
          HEAP32[buf + 28 >> 2] = stats.fsid;
          HEAP32[buf + 44 >> 2] = stats.flags;
          HEAP32[buf + 36 >> 2] = stats.namelen;
        },
        doMsync(addr, stream, len, flags, offset) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags & 2) {
            return 0;
          }
          var buffer = HEAPU8.slice(addr, addr + len);
          FS.msync(stream, buffer, offset, len, flags);
        },
        getStreamFromFD(fd) {
          var stream = FS.getStreamChecked(fd);
          return stream;
        },
        varargs: void 0,
        getStr(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        }
      };
      function ___syscall_fcntl64(fd, cmd, varargs) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(3, 0, 1, fd, cmd, varargs);
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (cmd) {
            case 0: {
              var arg = syscallGetVarargI();
              if (arg < 0) {
                return -28;
              }
              while (FS.streams[arg]) {
                arg++;
              }
              var newStream;
              newStream = FS.dupStream(stream, arg);
              return newStream.fd;
            }
            case 1:
            case 2:
              return 0;
            // FD_CLOEXEC makes no sense for a single process.
            case 3:
              return stream.flags;
            case 4: {
              var arg = syscallGetVarargI();
              stream.flags |= arg;
              return 0;
            }
            case 12: {
              var arg = syscallGetVarargP();
              var offset = 0;
              HEAP16[arg + offset >> 1] = 2;
              return 0;
            }
            case 13:
            case 14:
              return 0;
          }
          return -28;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_fstat64(fd, buf) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(4, 0, 1, fd, buf);
        try {
          return SYSCALLS.writeStat(buf, FS.fstat(fd));
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_ftruncate64(fd, length) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(5, 0, 1, fd, length);
        length = bigintToI53Checked(length);
        try {
          if (isNaN(length)) return 61;
          FS.ftruncate(fd, length);
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
        ;
      }
      var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      };
      function ___syscall_getcwd(buf, size) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(6, 0, 1, buf, size);
        try {
          if (size === 0) return -28;
          var cwd = FS.cwd();
          var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
          if (size < cwdLengthInBytes) return -68;
          stringToUTF8(cwd, buf, size);
          return cwdLengthInBytes;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_getdents64(fd, dirp, count) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(7, 0, 1, fd, dirp, count);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          stream.getdents ||= FS.readdir(stream.path);
          var struct_size = 280;
          var pos = 0;
          var off = FS.llseek(stream, 0, 1);
          var startIdx = Math.floor(off / struct_size);
          var endIdx = Math.min(stream.getdents.length, startIdx + Math.floor(count / struct_size));
          for (var idx = startIdx; idx < endIdx; idx++) {
            var id;
            var type;
            var name = stream.getdents[idx];
            if (name === ".") {
              id = stream.node.id;
              type = 4;
            } else if (name === "..") {
              var lookup = FS.lookupPath(stream.path, { parent: true });
              id = lookup.node.id;
              type = 4;
            } else {
              var child;
              try {
                child = FS.lookupNode(stream.node, name);
              } catch (e) {
                if (e?.errno === 28) {
                  continue;
                }
                throw e;
              }
              id = child.id;
              type = FS.isChrdev(child.mode) ? 2 : (
                // DT_CHR, character device.
                FS.isDir(child.mode) ? 4 : (
                  // DT_DIR, directory.
                  FS.isLink(child.mode) ? 10 : (
                    // DT_LNK, symbolic link.
                    8
                  )
                )
              );
            }
            HEAP64[dirp + pos >> 3] = BigInt(id);
            HEAP64[dirp + pos + 8 >> 3] = BigInt((idx + 1) * struct_size);
            HEAP16[dirp + pos + 16 >> 1] = 280;
            HEAP8[dirp + pos + 18] = type;
            stringToUTF8(name, dirp + pos + 19, 256);
            pos += struct_size;
          }
          FS.llseek(stream, idx * struct_size, 0);
          return pos;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_ioctl(fd, op, varargs) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(8, 0, 1, fd, op, varargs);
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (op) {
            case 21509: {
              if (!stream.tty) return -59;
              return 0;
            }
            case 21505: {
              if (!stream.tty) return -59;
              if (stream.tty.ops.ioctl_tcgets) {
                var termios = stream.tty.ops.ioctl_tcgets(stream);
                var argp = syscallGetVarargP();
                HEAP32[argp >> 2] = termios.c_iflag || 0;
                HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
                HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
                HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
                for (var i2 = 0; i2 < 32; i2++) {
                  HEAP8[argp + i2 + 17] = termios.c_cc[i2] || 0;
                }
                return 0;
              }
              return 0;
            }
            case 21510:
            case 21511:
            case 21512: {
              if (!stream.tty) return -59;
              return 0;
            }
            case 21506:
            case 21507:
            case 21508: {
              if (!stream.tty) return -59;
              if (stream.tty.ops.ioctl_tcsets) {
                var argp = syscallGetVarargP();
                var c_iflag = HEAP32[argp >> 2];
                var c_oflag = HEAP32[argp + 4 >> 2];
                var c_cflag = HEAP32[argp + 8 >> 2];
                var c_lflag = HEAP32[argp + 12 >> 2];
                var c_cc = [];
                for (var i2 = 0; i2 < 32; i2++) {
                  c_cc.push(HEAP8[argp + i2 + 17]);
                }
                return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
              }
              return 0;
            }
            case 21519: {
              if (!stream.tty) return -59;
              var argp = syscallGetVarargP();
              HEAP32[argp >> 2] = 0;
              return 0;
            }
            case 21520: {
              if (!stream.tty) return -59;
              return -28;
            }
            case 21531: {
              var argp = syscallGetVarargP();
              return FS.ioctl(stream, op, argp);
            }
            case 21523: {
              if (!stream.tty) return -59;
              if (stream.tty.ops.ioctl_tiocgwinsz) {
                var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
                var argp = syscallGetVarargP();
                HEAP16[argp >> 1] = winsize[0];
                HEAP16[argp + 2 >> 1] = winsize[1];
              }
              return 0;
            }
            case 21524: {
              if (!stream.tty) return -59;
              return 0;
            }
            case 21515: {
              if (!stream.tty) return -59;
              return 0;
            }
            default:
              return -28;
          }
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_lstat64(path, buf) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(9, 0, 1, path, buf);
        try {
          path = SYSCALLS.getStr(path);
          return SYSCALLS.writeStat(buf, FS.lstat(path));
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_mkdirat(dirfd, path, mode) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(10, 0, 1, dirfd, path, mode);
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          FS.mkdir(path, mode, 0);
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_newfstatat(dirfd, path, buf, flags) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(11, 0, 1, dirfd, path, buf, flags);
        try {
          path = SYSCALLS.getStr(path);
          var nofollow = flags & 256;
          var allowEmpty = flags & 4096;
          flags = flags & ~6400;
          path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
          return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_openat(dirfd, path, flags, varargs) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(12, 0, 1, dirfd, path, flags, varargs);
        SYSCALLS.varargs = varargs;
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          var mode = varargs ? syscallGetVarargI() : 0;
          return FS.open(path, flags, mode).fd;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(13, 0, 1, dirfd, path, buf, bufsize);
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          if (bufsize <= 0) return -28;
          var ret = FS.readlink(path);
          var len = Math.min(bufsize, lengthBytesUTF8(ret));
          var endChar = HEAP8[buf + len];
          stringToUTF8(ret, buf, bufsize + 1);
          HEAP8[buf + len] = endChar;
          return len;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_rmdir(path) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(14, 0, 1, path);
        try {
          path = SYSCALLS.getStr(path);
          FS.rmdir(path);
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_stat64(path, buf) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(15, 0, 1, path, buf);
        try {
          path = SYSCALLS.getStr(path);
          return SYSCALLS.writeStat(buf, FS.stat(path));
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      function ___syscall_unlinkat(dirfd, path, flags) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(16, 0, 1, dirfd, path, flags);
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          if (flags === 0) {
            FS.unlink(path);
          } else if (flags === 512) {
            FS.rmdir(path);
          } else {
            abort("Invalid flags passed to unlinkat");
          }
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      var readI53FromI64 = (ptr) => {
        return HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296;
      };
      function ___syscall_utimensat(dirfd, path, times, flags) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(17, 0, 1, dirfd, path, times, flags);
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path, true);
          var now = Date.now(), atime, mtime;
          if (!times) {
            atime = now;
            mtime = now;
          } else {
            var seconds = readI53FromI64(times);
            var nanoseconds = HEAP32[times + 8 >> 2];
            if (nanoseconds == 1073741823) {
              atime = now;
            } else if (nanoseconds == 1073741822) {
              atime = null;
            } else {
              atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
            }
            times += 16;
            seconds = readI53FromI64(times);
            nanoseconds = HEAP32[times + 8 >> 2];
            if (nanoseconds == 1073741823) {
              mtime = now;
            } else if (nanoseconds == 1073741822) {
              mtime = null;
            } else {
              mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
            }
          }
          if ((mtime ?? atime) !== null) {
            FS.utime(path, atime, mtime);
          }
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
      }
      var __abort_js = () => abort("");
      var __emscripten_init_main_thread_js = (tb) => {
        __emscripten_thread_init(
          tb,
          /*is_main=*/
          !ENVIRONMENT_IS_WORKER,
          /*is_runtime=*/
          1,
          /*can_block=*/
          !ENVIRONMENT_IS_WEB,
          /*default_stacksize=*/
          65536,
          /*start_profiling=*/
          false
        );
        PThread.threadInitTLS();
      };
      var maybeExit = () => {
        if (!keepRuntimeAlive()) {
          try {
            if (ENVIRONMENT_IS_PTHREAD) __emscripten_thread_exit(EXITSTATUS);
            else
              _exit(EXITSTATUS);
          } catch (e) {
            handleException(e);
          }
        }
      };
      var callUserCallback = (func) => {
        if (ABORT) {
          return;
        }
        try {
          func();
          maybeExit();
        } catch (e) {
          handleException(e);
        }
      };
      var __emscripten_thread_mailbox_await = (pthread_ptr) => {
        if (typeof Atomics.waitAsync === "function") {
          var wait = Atomics.waitAsync(HEAP32, pthread_ptr >> 2, pthread_ptr);
          wait.value.then(checkMailbox);
          var waitingAsync = pthread_ptr + 128;
          Atomics.store(HEAP32, waitingAsync >> 2, 1);
        }
      };
      var checkMailbox = () => {
        var pthread_ptr = _pthread_self();
        if (pthread_ptr) {
          __emscripten_thread_mailbox_await(pthread_ptr);
          callUserCallback(__emscripten_check_mailbox);
        }
      };
      var __emscripten_notify_mailbox_postmessage = (targetThread, currThreadId) => {
        if (targetThread == currThreadId) {
          setTimeout(checkMailbox);
        } else if (ENVIRONMENT_IS_PTHREAD) {
          postMessage({ targetThread, cmd: "checkMailbox" });
        } else {
          var worker = PThread.pthreads[targetThread];
          if (!worker) {
            return;
          }
          worker.postMessage({ cmd: "checkMailbox" });
        }
      };
      var proxiedJSCallArgs = [];
      var __emscripten_receive_on_main_thread_js = (funcIndex, emAsmAddr, callingThread, numCallArgs, args) => {
        numCallArgs /= 2;
        proxiedJSCallArgs.length = numCallArgs;
        var b = args >> 3;
        for (var i2 = 0; i2 < numCallArgs; i2++) {
          if (HEAP64[b + 2 * i2]) {
            proxiedJSCallArgs[i2] = HEAP64[b + 2 * i2 + 1];
          } else {
            proxiedJSCallArgs[i2] = HEAPF64[b + 2 * i2 + 1];
          }
        }
        var func = emAsmAddr ? ASM_CONSTS[emAsmAddr] : proxiedFunctionTable[funcIndex];
        PThread.currentProxiedOperationCallerThread = callingThread;
        var rtn = func(...proxiedJSCallArgs);
        PThread.currentProxiedOperationCallerThread = 0;
        return rtn;
      };
      var __emscripten_runtime_keepalive_clear = () => {
        noExitRuntime = false;
        runtimeKeepaliveCounter = 0;
      };
      var __emscripten_thread_cleanup = (thread) => {
        if (!ENVIRONMENT_IS_PTHREAD) cleanupThread(thread);
        else postMessage({ cmd: "cleanupThread", thread });
      };
      var __emscripten_thread_set_strongref = (thread) => {
      };
      var __emscripten_throw_longjmp = () => {
        throw Infinity;
      };
      var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
      var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      var ydayFromDate = (date) => {
        var leap = isLeapYear(date.getFullYear());
        var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
        var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
        return yday;
      };
      function __localtime_js(time, tmPtr) {
        time = bigintToI53Checked(time);
        var date = new Date(time * 1e3);
        HEAP32[tmPtr >> 2] = date.getSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getHours();
        HEAP32[tmPtr + 12 >> 2] = date.getDate();
        HEAP32[tmPtr + 16 >> 2] = date.getMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
        HEAP32[tmPtr + 24 >> 2] = date.getDay();
        var yday = ydayFromDate(date) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
        var start = new Date(date.getFullYear(), 0, 1);
        var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
        HEAP32[tmPtr + 32 >> 2] = dst;
        ;
      }
      var __mktime_js = function(tmPtr) {
        var ret = (() => {
          var date = new Date(
            HEAP32[tmPtr + 20 >> 2] + 1900,
            HEAP32[tmPtr + 16 >> 2],
            HEAP32[tmPtr + 12 >> 2],
            HEAP32[tmPtr + 8 >> 2],
            HEAP32[tmPtr + 4 >> 2],
            HEAP32[tmPtr >> 2],
            0
          );
          var dst = HEAP32[tmPtr + 32 >> 2];
          var guessedOffset = date.getTimezoneOffset();
          var start = new Date(date.getFullYear(), 0, 1);
          var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
          var winterOffset = start.getTimezoneOffset();
          var dstOffset = Math.min(winterOffset, summerOffset);
          if (dst < 0) {
            HEAP32[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
          } else if (dst > 0 != (dstOffset == guessedOffset)) {
            var nonDstOffset = Math.max(winterOffset, summerOffset);
            var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
            date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
          }
          HEAP32[tmPtr + 24 >> 2] = date.getDay();
          var yday = ydayFromDate(date) | 0;
          HEAP32[tmPtr + 28 >> 2] = yday;
          HEAP32[tmPtr >> 2] = date.getSeconds();
          HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
          HEAP32[tmPtr + 8 >> 2] = date.getHours();
          HEAP32[tmPtr + 12 >> 2] = date.getDate();
          HEAP32[tmPtr + 16 >> 2] = date.getMonth();
          HEAP32[tmPtr + 20 >> 2] = date.getYear();
          var timeMs = date.getTime();
          if (isNaN(timeMs)) {
            return -1;
          }
          return timeMs / 1e3;
        })();
        return BigInt(ret);
      };
      function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(18, 0, 1, len, prot, flags, fd, offset, allocated, addr);
        offset = bigintToI53Checked(offset);
        try {
          if (isNaN(offset)) return 61;
          var stream = SYSCALLS.getStreamFromFD(fd);
          var res = FS.mmap(stream, len, offset, prot, flags);
          var ptr = res.ptr;
          HEAP32[allocated >> 2] = res.allocated;
          HEAPU32[addr >> 2] = ptr;
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
        ;
      }
      function __msync_js(addr, len, prot, flags, fd, offset) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(19, 0, 1, addr, len, prot, flags, fd, offset);
        offset = bigintToI53Checked(offset);
        try {
          if (isNaN(offset)) return 61;
          SYSCALLS.doMsync(addr, SYSCALLS.getStreamFromFD(fd), len, flags, offset);
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
        ;
      }
      function __munmap_js(addr, len, prot, flags, fd, offset) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(20, 0, 1, addr, len, prot, flags, fd, offset);
        offset = bigintToI53Checked(offset);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          if (prot & 2) {
            SYSCALLS.doMsync(addr, stream, len, flags, offset);
          }
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return -e.errno;
        }
        ;
      }
      var __tzset_js = (timezone, daylight, std_name, dst_name) => {
        var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        var winter = new Date(currentYear, 0, 1);
        var summer = new Date(currentYear, 6, 1);
        var winterOffset = winter.getTimezoneOffset();
        var summerOffset = summer.getTimezoneOffset();
        var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
        HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
        HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
        var extractZone = (timezoneOffset) => {
          var sign = timezoneOffset >= 0 ? "-" : "+";
          var absOffset = Math.abs(timezoneOffset);
          var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
          var minutes = String(absOffset % 60).padStart(2, "0");
          return `UTC${sign}${hours}${minutes}`;
        };
        var winterName = extractZone(winterOffset);
        var summerName = extractZone(summerOffset);
        if (summerOffset < winterOffset) {
          stringToUTF8(winterName, std_name, 17);
          stringToUTF8(summerName, dst_name, 17);
        } else {
          stringToUTF8(winterName, dst_name, 17);
          stringToUTF8(summerName, std_name, 17);
        }
      };
      var _emscripten_get_now = () => performance.timeOrigin + performance.now();
      var _emscripten_date_now = () => Date.now();
      var nowIsMonotonic = 1;
      var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
      function _clock_time_get(clk_id, ignored_precision, ptime) {
        ignored_precision = bigintToI53Checked(ignored_precision);
        if (!checkWasiClock(clk_id)) {
          return 28;
        }
        var now;
        if (clk_id === 0) {
          now = _emscripten_date_now();
        } else if (nowIsMonotonic) {
          now = _emscripten_get_now();
        } else {
          return 52;
        }
        var nsec = Math.round(now * 1e3 * 1e3);
        HEAP64[ptime >> 3] = BigInt(nsec);
        return 0;
        ;
      }
      var runtimeKeepalivePush = () => {
        runtimeKeepaliveCounter += 1;
      };
      var runtimeKeepalivePop = () => {
        runtimeKeepaliveCounter -= 1;
      };
      var safeSetTimeout = (func, timeout) => {
        runtimeKeepalivePush();
        return setTimeout(() => {
          runtimeKeepalivePop();
          callUserCallback(func);
        }, timeout);
      };
      var warnOnce = (text) => {
        warnOnce.shown ||= {};
        if (!warnOnce.shown[text]) {
          warnOnce.shown[text] = 1;
          err(text);
        }
      };
      var Browser = {
        useWebGL: false,
        isFullscreen: false,
        pointerLock: false,
        moduleContextCreatedCallbacks: [],
        workers: [],
        preloadedImages: {},
        preloadedAudios: {},
        getCanvas: () => Module["canvas"],
        init() {
          if (Browser.initted) return;
          Browser.initted = true;
          var imagePlugin = {};
          imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
            return !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
          };
          imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
            var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            if (b.size !== byteArray.length) {
              b = new Blob([new Uint8Array(byteArray).buffer], { type: Browser.getMimetype(name) });
            }
            var url = URL.createObjectURL(b);
            var img = new Image();
            img.onload = () => {
              var canvas2 = (
                /** @type {!HTMLCanvasElement} */
                document.createElement("canvas")
              );
              canvas2.width = img.width;
              canvas2.height = img.height;
              var ctx = canvas2.getContext("2d");
              ctx.drawImage(img, 0, 0);
              Browser.preloadedImages[name] = canvas2;
              URL.revokeObjectURL(url);
              onload?.(byteArray);
            };
            img.onerror = (event2) => {
              err(`Image ${url} could not be decoded`);
              onerror?.();
            };
            img.src = url;
          };
          preloadPlugins.push(imagePlugin);
          var audioPlugin = {};
          audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
            return !Module["noAudioDecoding"] && name.slice(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
          };
          audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
            var done = false;
            function finish(audio2) {
              if (done) return;
              done = true;
              Browser.preloadedAudios[name] = audio2;
              onload?.(byteArray);
            }
            function fail() {
              if (done) return;
              done = true;
              Browser.preloadedAudios[name] = new Audio();
              onerror?.();
            }
            var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            var url = URL.createObjectURL(b);
            var audio = new Audio();
            audio.addEventListener("canplaythrough", () => finish(audio), false);
            audio.onerror = function audio_onerror(event2) {
              if (done) return;
              err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
              function encode64(data) {
                var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var PAD = "=";
                var ret = "";
                var leftchar = 0;
                var leftbits = 0;
                for (var i2 = 0; i2 < data.length; i2++) {
                  leftchar = leftchar << 8 | data[i2];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = leftchar >> leftbits - 6 & 63;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar & 3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar & 15) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = "data:audio/x-" + name.slice(-3) + ";base64," + encode64(byteArray);
              finish(audio);
            };
            audio.src = url;
            safeSetTimeout(() => {
              finish(audio);
            }, 1e4);
          };
          preloadPlugins.push(audioPlugin);
          function pointerLockChange() {
            var canvas2 = Browser.getCanvas();
            Browser.pointerLock = document["pointerLockElement"] === canvas2 || document["mozPointerLockElement"] === canvas2 || document["webkitPointerLockElement"] === canvas2 || document["msPointerLockElement"] === canvas2;
          }
          var canvas = Browser.getCanvas();
          if (canvas) {
            canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {
            });
            canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {
            });
            canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
            document.addEventListener("pointerlockchange", pointerLockChange, false);
            document.addEventListener("mozpointerlockchange", pointerLockChange, false);
            document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
            document.addEventListener("mspointerlockchange", pointerLockChange, false);
            if (Module["elementPointerLock"]) {
              canvas.addEventListener("click", (ev) => {
                if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
                  Browser.getCanvas().requestPointerLock();
                  ev.preventDefault();
                }
              }, false);
            }
          }
        },
        createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
          if (useWebGL && Module["ctx"] && canvas == Browser.getCanvas()) return Module["ctx"];
          var ctx;
          var contextHandle;
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false,
              majorVersion: 2
            };
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
            if (typeof GL != "undefined") {
              contextHandle = GL.createContext(canvas, contextAttributes);
              if (contextHandle) {
                ctx = GL.getContext(contextHandle).GLctx;
              }
            }
          } else {
            ctx = canvas.getContext("2d");
          }
          if (!ctx) return null;
          if (setInModule) {
            Module["ctx"] = ctx;
            if (useWebGL) GL.makeContextCurrent(contextHandle);
            Browser.useWebGL = useWebGL;
            Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
            Browser.init();
          }
          return ctx;
        },
        fullscreenHandlersInstalled: false,
        lockPointer: void 0,
        resizeCanvas: void 0,
        requestFullscreen(lockPointer, resizeCanvas) {
          Browser.lockPointer = lockPointer;
          Browser.resizeCanvas = resizeCanvas;
          if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
          if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
          var canvas = Browser.getCanvas();
          function fullscreenChange() {
            Browser.isFullscreen = false;
            var canvasContainer2 = canvas.parentNode;
            if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer2) {
              canvas.exitFullscreen = Browser.exitFullscreen;
              if (Browser.lockPointer) canvas.requestPointerLock();
              Browser.isFullscreen = true;
              if (Browser.resizeCanvas) {
                Browser.setFullscreenCanvasSize();
              } else {
                Browser.updateCanvasDimensions(canvas);
              }
            } else {
              canvasContainer2.parentNode.insertBefore(canvas, canvasContainer2);
              canvasContainer2.parentNode.removeChild(canvasContainer2);
              if (Browser.resizeCanvas) {
                Browser.setWindowedCanvasSize();
              } else {
                Browser.updateCanvasDimensions(canvas);
              }
            }
            Module["onFullScreen"]?.(Browser.isFullscreen);
            Module["onFullscreen"]?.(Browser.isFullscreen);
          }
          if (!Browser.fullscreenHandlersInstalled) {
            Browser.fullscreenHandlersInstalled = true;
            document.addEventListener("fullscreenchange", fullscreenChange, false);
            document.addEventListener("mozfullscreenchange", fullscreenChange, false);
            document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
            document.addEventListener("MSFullscreenChange", fullscreenChange, false);
          }
          var canvasContainer = document.createElement("div");
          canvas.parentNode.insertBefore(canvasContainer, canvas);
          canvasContainer.appendChild(canvas);
          canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
          canvasContainer.requestFullscreen();
        },
        exitFullscreen() {
          if (!Browser.isFullscreen) {
            return false;
          }
          var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {
          });
          CFS.apply(document, []);
          return true;
        },
        safeSetTimeout(func, timeout) {
          return safeSetTimeout(func, timeout);
        },
        getMimetype(name) {
          return {
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "png": "image/png",
            "bmp": "image/bmp",
            "ogg": "audio/ogg",
            "wav": "audio/wav",
            "mp3": "audio/mpeg"
          }[name.slice(name.lastIndexOf(".") + 1)];
        },
        getUserMedia(func) {
          window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
          window.getUserMedia(func);
        },
        getMovementX(event2) {
          return event2["movementX"] || event2["mozMovementX"] || event2["webkitMovementX"] || 0;
        },
        getMovementY(event2) {
          return event2["movementY"] || event2["mozMovementY"] || event2["webkitMovementY"] || 0;
        },
        getMouseWheelDelta(event2) {
          var delta = 0;
          switch (event2.type) {
            case "DOMMouseScroll":
              delta = event2.detail / 3;
              break;
            case "mousewheel":
              delta = event2.wheelDelta / 120;
              break;
            case "wheel":
              delta = event2.deltaY;
              switch (event2.deltaMode) {
                case 0:
                  delta /= 100;
                  break;
                case 1:
                  delta /= 3;
                  break;
                case 2:
                  delta *= 80;
                  break;
                default:
                  throw "unrecognized mouse wheel delta mode: " + event2.deltaMode;
              }
              break;
            default:
              throw "unrecognized mouse wheel event: " + event2.type;
          }
          return delta;
        },
        mouseX: 0,
        mouseY: 0,
        mouseMovementX: 0,
        mouseMovementY: 0,
        touches: {},
        lastTouches: {},
        calculateMouseCoords(pageX, pageY) {
          var canvas = Browser.getCanvas();
          var rect = canvas.getBoundingClientRect();
          var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
          var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
          var adjustedX = pageX - (scrollX + rect.left);
          var adjustedY = pageY - (scrollY + rect.top);
          adjustedX = adjustedX * (canvas.width / rect.width);
          adjustedY = adjustedY * (canvas.height / rect.height);
          return { x: adjustedX, y: adjustedY };
        },
        setMouseCoords(pageX, pageY) {
          const { x, y } = Browser.calculateMouseCoords(pageX, pageY);
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        },
        calculateMouseEvent(event2) {
          if (Browser.pointerLock) {
            if (event2.type != "mousemove" && "mozMovementX" in event2) {
              Browser.mouseMovementX = Browser.mouseMovementY = 0;
            } else {
              Browser.mouseMovementX = Browser.getMovementX(event2);
              Browser.mouseMovementY = Browser.getMovementY(event2);
            }
            Browser.mouseX += Browser.mouseMovementX;
            Browser.mouseY += Browser.mouseMovementY;
          } else {
            if (event2.type === "touchstart" || event2.type === "touchend" || event2.type === "touchmove") {
              var touch = event2.touch;
              if (touch === void 0) {
                return;
              }
              var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
              if (event2.type === "touchstart") {
                Browser.lastTouches[touch.identifier] = coords;
                Browser.touches[touch.identifier] = coords;
              } else if (event2.type === "touchend" || event2.type === "touchmove") {
                var last = Browser.touches[touch.identifier];
                last ||= coords;
                Browser.lastTouches[touch.identifier] = last;
                Browser.touches[touch.identifier] = coords;
              }
              return;
            }
            Browser.setMouseCoords(event2.pageX, event2.pageY);
          }
        },
        resizeListeners: [],
        updateResizeListeners() {
          var canvas = Browser.getCanvas();
          Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
        },
        setCanvasSize(width, height, noUpdates) {
          var canvas = Browser.getCanvas();
          Browser.updateCanvasDimensions(canvas, width, height);
          if (!noUpdates) Browser.updateResizeListeners();
        },
        windowedWidth: 0,
        windowedHeight: 0,
        setFullscreenCanvasSize() {
          if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags | 8388608;
            HEAP32[SDL.screen >> 2] = flags;
          }
          Browser.updateCanvasDimensions(Browser.getCanvas());
          Browser.updateResizeListeners();
        },
        setWindowedCanvasSize() {
          if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags & ~8388608;
            HEAP32[SDL.screen >> 2] = flags;
          }
          Browser.updateCanvasDimensions(Browser.getCanvas());
          Browser.updateResizeListeners();
        },
        updateCanvasDimensions(canvas, wNative, hNative) {
          if (wNative && hNative) {
            canvas.widthNative = wNative;
            canvas.heightNative = hNative;
          } else {
            wNative = canvas.widthNative;
            hNative = canvas.heightNative;
          }
          var w = wNative;
          var h = hNative;
          if (Module["forcedAspectRatio"] > 0) {
            if (w / h < Module["forcedAspectRatio"]) {
              w = Math.round(h * Module["forcedAspectRatio"]);
            } else {
              h = Math.round(w / Module["forcedAspectRatio"]);
            }
          }
          if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
            var factor = Math.min(screen.width / w, screen.height / h);
            w = Math.round(w * factor);
            h = Math.round(h * factor);
          }
          if (Browser.resizeCanvas) {
            if (canvas.width != w) canvas.width = w;
            if (canvas.height != h) canvas.height = h;
            if (typeof canvas.style != "undefined") {
              canvas.style.removeProperty("width");
              canvas.style.removeProperty("height");
            }
          } else {
            if (canvas.width != wNative) canvas.width = wNative;
            if (canvas.height != hNative) canvas.height = hNative;
            if (typeof canvas.style != "undefined") {
              if (w != wNative || h != hNative) {
                canvas.style.setProperty("width", w + "px", "important");
                canvas.style.setProperty("height", h + "px", "important");
              } else {
                canvas.style.removeProperty("width");
                canvas.style.removeProperty("height");
              }
            }
          }
        }
      };
      var EGL = {
        errorCode: 12288,
        defaultDisplayInitialized: false,
        currentContext: 0,
        currentReadSurface: 0,
        currentDrawSurface: 0,
        contextAttributes: {
          alpha: false,
          depth: false,
          stencil: false,
          antialias: false
        },
        stringCache: {},
        setErrorCode(code) {
          EGL.errorCode = code;
        },
        chooseConfig(display, attribList, config, config_size, numConfigs) {
          if (display != 62e3) {
            EGL.setErrorCode(
              12296
              /* EGL_BAD_DISPLAY */
            );
            return 0;
          }
          if (attribList) {
            for (; ; ) {
              var param = HEAP32[attribList >> 2];
              if (param == 12321) {
                var alphaSize = HEAP32[attribList + 4 >> 2];
                EGL.contextAttributes.alpha = alphaSize > 0;
              } else if (param == 12325) {
                var depthSize = HEAP32[attribList + 4 >> 2];
                EGL.contextAttributes.depth = depthSize > 0;
              } else if (param == 12326) {
                var stencilSize = HEAP32[attribList + 4 >> 2];
                EGL.contextAttributes.stencil = stencilSize > 0;
              } else if (param == 12337) {
                var samples = HEAP32[attribList + 4 >> 2];
                EGL.contextAttributes.antialias = samples > 0;
              } else if (param == 12338) {
                var samples = HEAP32[attribList + 4 >> 2];
                EGL.contextAttributes.antialias = samples == 1;
              } else if (param == 12544) {
                var requestedPriority = HEAP32[attribList + 4 >> 2];
                EGL.contextAttributes.lowLatency = requestedPriority != 12547;
              } else if (param == 12344) {
                break;
              }
              attribList += 8;
            }
          }
          if ((!config || !config_size) && !numConfigs) {
            EGL.setErrorCode(
              12300
              /* EGL_BAD_PARAMETER */
            );
            return 0;
          }
          if (numConfigs) {
            HEAP32[numConfigs >> 2] = 1;
          }
          if (config && config_size > 0) {
            HEAPU32[config >> 2] = 62002;
          }
          EGL.setErrorCode(
            12288
            /* EGL_SUCCESS */
          );
          return 1;
        }
      };
      function _eglBindAPI(api) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(21, 0, 1, api);
        if (api == 12448) {
          EGL.setErrorCode(
            12288
            /* EGL_SUCCESS */
          );
          return 1;
        }
        EGL.setErrorCode(
          12300
          /* EGL_BAD_PARAMETER */
        );
        return 0;
      }
      function _eglChooseConfig(display, attrib_list, configs, config_size, numConfigs) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(22, 0, 1, display, attrib_list, configs, config_size, numConfigs);
        return EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
      }
      var GLctx;
      var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) => (
        // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
        !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"))
      );
      var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => {
        return !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
      };
      var webgl_enable_EXT_polygon_offset_clamp = (ctx) => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
      var webgl_enable_EXT_clip_control = (ctx) => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
      var webgl_enable_WEBGL_polygon_mode = (ctx) => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
      var webgl_enable_WEBGL_multi_draw = (ctx) => (
        // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
        !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"))
      );
      var getEmscriptenSupportedExtensions = (ctx) => {
        var supportedExtensions = [
          // WebGL 2 extensions
          "EXT_color_buffer_float",
          "EXT_conservative_depth",
          "EXT_disjoint_timer_query_webgl2",
          "EXT_texture_norm16",
          "NV_shader_noperspective_interpolation",
          "WEBGL_clip_cull_distance",
          // WebGL 1 and WebGL 2 extensions
          "EXT_clip_control",
          "EXT_color_buffer_half_float",
          "EXT_depth_clamp",
          "EXT_float_blend",
          "EXT_polygon_offset_clamp",
          "EXT_texture_compression_bptc",
          "EXT_texture_compression_rgtc",
          "EXT_texture_filter_anisotropic",
          "KHR_parallel_shader_compile",
          "OES_texture_float_linear",
          "WEBGL_blend_func_extended",
          "WEBGL_compressed_texture_astc",
          "WEBGL_compressed_texture_etc",
          "WEBGL_compressed_texture_etc1",
          "WEBGL_compressed_texture_s3tc",
          "WEBGL_compressed_texture_s3tc_srgb",
          "WEBGL_debug_renderer_info",
          "WEBGL_debug_shaders",
          "WEBGL_lose_context",
          "WEBGL_multi_draw",
          "WEBGL_polygon_mode"
        ];
        return (ctx.getSupportedExtensions() || []).filter((ext) => supportedExtensions.includes(ext));
      };
      var GL = {
        counter: 1,
        buffers: [],
        programs: [],
        framebuffers: [],
        renderbuffers: [],
        textures: [],
        shaders: [],
        vaos: [],
        contexts: {},
        offscreenCanvases: {},
        queries: [],
        samplers: [],
        transformFeedbacks: [],
        syncs: [],
        stringCache: {},
        stringiCache: {},
        unpackAlignment: 4,
        unpackRowLength: 0,
        recordError: (errorCode) => {
          if (!GL.lastError) {
            GL.lastError = errorCode;
          }
        },
        getNewId: (table) => {
          var ret = GL.counter++;
          for (var i2 = table.length; i2 < ret; i2++) {
            table[i2] = null;
          }
          return ret;
        },
        genObject: (n, buffers, createFunction, objectTable) => {
          for (var i2 = 0; i2 < n; i2++) {
            var buffer = GLctx[createFunction]();
            var id = buffer && GL.getNewId(objectTable);
            if (buffer) {
              buffer.name = id;
              objectTable[id] = buffer;
            } else {
              GL.recordError(
                1282
                /* GL_INVALID_OPERATION */
              );
            }
            HEAP32[buffers + i2 * 4 >> 2] = id;
          }
        },
        getSource: (shader, count, string, length) => {
          var source = "";
          for (var i2 = 0; i2 < count; ++i2) {
            var len = length ? HEAPU32[length + i2 * 4 >> 2] : void 0;
            source += UTF8ToString(HEAPU32[string + i2 * 4 >> 2], len);
          }
          return source;
        },
        createContext: (canvas, webGLContextAttributes) => {
          if (!canvas.getContextSafariWebGL2Fixed) {
            let fixedGetContext = function(ver, attrs) {
              var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
              return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
            };
            canvas.getContextSafariWebGL2Fixed = canvas.getContext;
            canvas.getContext = fixedGetContext;
          }
          var ctx = canvas.getContext("webgl2", webGLContextAttributes);
          if (!ctx) return 0;
          var handle = GL.registerContext(ctx, webGLContextAttributes);
          return handle;
        },
        registerContext: (ctx, webGLContextAttributes) => {
          var handle = _malloc(8);
          HEAPU32[handle + 4 >> 2] = _pthread_self();
          var context = {
            handle,
            attributes: webGLContextAttributes,
            version: webGLContextAttributes.majorVersion,
            GLctx: ctx
          };
          if (ctx.canvas) ctx.canvas.GLctxObject = context;
          GL.contexts[handle] = context;
          if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
            GL.initExtensions(context);
          }
          return handle;
        },
        makeContextCurrent: (contextHandle) => {
          GL.currentContext = GL.contexts[contextHandle];
          Module["ctx"] = GLctx = GL.currentContext?.GLctx;
          return !(contextHandle && !GLctx);
        },
        getContext: (contextHandle) => {
          return GL.contexts[contextHandle];
        },
        deleteContext: (contextHandle) => {
          if (GL.currentContext === GL.contexts[contextHandle]) {
            GL.currentContext = null;
          }
          if (typeof JSEvents == "object") {
            JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
          }
          if (GL.contexts[contextHandle]?.GLctx.canvas) {
            GL.contexts[contextHandle].GLctx.canvas.GLctxObject = void 0;
          }
          _free(GL.contexts[contextHandle].handle);
          GL.contexts[contextHandle] = null;
        },
        initExtensions: (context) => {
          context ||= GL.currentContext;
          if (context.initExtensionsDone) return;
          context.initExtensionsDone = true;
          var GLctx2 = context.GLctx;
          webgl_enable_WEBGL_multi_draw(GLctx2);
          webgl_enable_EXT_polygon_offset_clamp(GLctx2);
          webgl_enable_EXT_clip_control(GLctx2);
          webgl_enable_WEBGL_polygon_mode(GLctx2);
          webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx2);
          webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx2);
          if (context.version >= 2) {
            GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query_webgl2");
          }
          if (context.version < 2 || !GLctx2.disjointTimerQueryExt) {
            GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query");
          }
          getEmscriptenSupportedExtensions(GLctx2).forEach((ext) => {
            if (!ext.includes("lose_context") && !ext.includes("debug")) {
              GLctx2.getExtension(ext);
            }
          });
        }
      };
      function _eglCreateContext(display, config, hmm, contextAttribs) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(23, 0, 1, display, config, hmm, contextAttribs);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        var glesContextVersion = 1;
        for (; ; ) {
          var param = HEAP32[contextAttribs >> 2];
          if (param == 12440) {
            glesContextVersion = HEAP32[contextAttribs + 4 >> 2];
          } else if (param == 12344) {
            break;
          } else {
            EGL.setErrorCode(
              12292
              /*EGL_BAD_ATTRIBUTE*/
            );
            return 0;
          }
          contextAttribs += 8;
        }
        if (glesContextVersion < 2 || glesContextVersion > 3) {
          EGL.setErrorCode(
            12293
            /* EGL_BAD_CONFIG */
          );
          return 0;
        }
        EGL.contextAttributes.majorVersion = glesContextVersion - 1;
        EGL.contextAttributes.minorVersion = 0;
        EGL.context = GL.createContext(Browser.getCanvas(), EGL.contextAttributes);
        if (EGL.context != 0) {
          EGL.setErrorCode(
            12288
            /* EGL_SUCCESS */
          );
          GL.makeContextCurrent(EGL.context);
          Browser.useWebGL = true;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          GL.makeContextCurrent(null);
          return 62004;
        } else {
          EGL.setErrorCode(
            12297
            /* EGL_BAD_MATCH */
          );
          return 0;
        }
      }
      function _eglCreateWindowSurface(display, config, win, attrib_list) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(24, 0, 1, display, config, win, attrib_list);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        if (config != 62002) {
          EGL.setErrorCode(
            12293
            /* EGL_BAD_CONFIG */
          );
          return 0;
        }
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 62006;
      }
      function _eglDestroyContext(display, context) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(25, 0, 1, display, context);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        if (context != 62004) {
          EGL.setErrorCode(
            12294
            /* EGL_BAD_CONTEXT */
          );
          return 0;
        }
        GL.deleteContext(EGL.context);
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        if (EGL.currentContext == context) {
          EGL.currentContext = 0;
        }
        return 1;
      }
      function _eglDestroySurface(display, surface) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(26, 0, 1, display, surface);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        if (surface != 62006) {
          EGL.setErrorCode(
            12301
            /* EGL_BAD_SURFACE */
          );
          return 1;
        }
        if (EGL.currentReadSurface == surface) {
          EGL.currentReadSurface = 0;
        }
        if (EGL.currentDrawSurface == surface) {
          EGL.currentDrawSurface = 0;
        }
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 1;
      }
      function _eglGetConfigAttrib(display, config, attribute, value) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(27, 0, 1, display, config, attribute, value);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        if (config != 62002) {
          EGL.setErrorCode(
            12293
            /* EGL_BAD_CONFIG */
          );
          return 0;
        }
        if (!value) {
          EGL.setErrorCode(
            12300
            /* EGL_BAD_PARAMETER */
          );
          return 0;
        }
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        switch (attribute) {
          case 12320:
            HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 32 : 24;
            return 1;
          case 12321:
            HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 8 : 0;
            return 1;
          case 12322:
            HEAP32[value >> 2] = 8;
            return 1;
          case 12323:
            HEAP32[value >> 2] = 8;
            return 1;
          case 12324:
            HEAP32[value >> 2] = 8;
            return 1;
          case 12325:
            HEAP32[value >> 2] = EGL.contextAttributes.depth ? 24 : 0;
            return 1;
          case 12326:
            HEAP32[value >> 2] = EGL.contextAttributes.stencil ? 8 : 0;
            return 1;
          case 12327:
            HEAP32[value >> 2] = 12344;
            return 1;
          case 12328:
            HEAP32[value >> 2] = 62002;
            return 1;
          case 12329:
            HEAP32[value >> 2] = 0;
            return 1;
          case 12330:
            HEAP32[value >> 2] = 4096;
            return 1;
          case 12331:
            HEAP32[value >> 2] = 16777216;
            return 1;
          case 12332:
            HEAP32[value >> 2] = 4096;
            return 1;
          case 12333:
            HEAP32[value >> 2] = 0;
            return 1;
          case 12334:
            HEAP32[value >> 2] = 0;
            return 1;
          case 12335:
            HEAP32[value >> 2] = 12344;
            return 1;
          case 12337:
            HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 4 : 0;
            return 1;
          case 12338:
            HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 1 : 0;
            return 1;
          case 12339:
            HEAP32[value >> 2] = 4;
            return 1;
          case 12340:
            HEAP32[value >> 2] = 12344;
            return 1;
          case 12341:
          // EGL_TRANSPARENT_BLUE_VALUE
          case 12342:
          // EGL_TRANSPARENT_GREEN_VALUE
          case 12343:
            HEAP32[value >> 2] = -1;
            return 1;
          case 12345:
          // EGL_BIND_TO_TEXTURE_RGB
          case 12346:
            HEAP32[value >> 2] = 0;
            return 1;
          case 12347:
            HEAP32[value >> 2] = 0;
            return 1;
          case 12348:
            HEAP32[value >> 2] = 1;
            return 1;
          case 12349:
          // EGL_LUMINANCE_SIZE
          case 12350:
            HEAP32[value >> 2] = 0;
            return 1;
          case 12351:
            HEAP32[value >> 2] = 12430;
            return 1;
          case 12352:
            HEAP32[value >> 2] = 4;
            return 1;
          case 12354:
            HEAP32[value >> 2] = 0;
            return 1;
          default:
            EGL.setErrorCode(
              12292
              /* EGL_BAD_ATTRIBUTE */
            );
            return 0;
        }
      }
      function _eglGetDisplay(nativeDisplayType) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(28, 0, 1, nativeDisplayType);
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        if (nativeDisplayType != 0 && nativeDisplayType != 1) {
          return 0;
        }
        return 62e3;
      }
      function _eglGetError() {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(29, 0, 1);
        return EGL.errorCode;
      }
      function _eglInitialize(display, majorVersion, minorVersion) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(30, 0, 1, display, majorVersion, minorVersion);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        if (majorVersion) {
          HEAP32[majorVersion >> 2] = 1;
        }
        if (minorVersion) {
          HEAP32[minorVersion >> 2] = 4;
        }
        EGL.defaultDisplayInitialized = true;
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 1;
      }
      function _eglMakeCurrent(display, draw, read, context) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(31, 0, 1, display, draw, read, context);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        if (context != 0 && context != 62004) {
          EGL.setErrorCode(
            12294
            /* EGL_BAD_CONTEXT */
          );
          return 0;
        }
        if (read != 0 && read != 62006 || draw != 0 && draw != 62006) {
          EGL.setErrorCode(
            12301
            /* EGL_BAD_SURFACE */
          );
          return 0;
        }
        GL.makeContextCurrent(context ? EGL.context : null);
        EGL.currentContext = context;
        EGL.currentDrawSurface = draw;
        EGL.currentReadSurface = read;
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 1;
      }
      var stringToNewUTF8 = (str) => {
        var size = lengthBytesUTF8(str) + 1;
        var ret = _malloc(size);
        if (ret) stringToUTF8(str, ret, size);
        return ret;
      };
      function _eglQueryString(display, name) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(32, 0, 1, display, name);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        if (EGL.stringCache[name]) return EGL.stringCache[name];
        var ret;
        switch (name) {
          case 12371:
            ret = stringToNewUTF8("Emscripten");
            break;
          case 12372:
            ret = stringToNewUTF8("1.4 Emscripten EGL");
            break;
          case 12373:
            ret = stringToNewUTF8("");
            break;
          // Currently not supporting any EGL extensions.
          case 12429:
            ret = stringToNewUTF8("OpenGL_ES");
            break;
          default:
            EGL.setErrorCode(
              12300
              /* EGL_BAD_PARAMETER */
            );
            return 0;
        }
        EGL.stringCache[name] = ret;
        return ret;
      }
      function _eglSwapBuffers(dpy, surface) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(33, 0, 1, dpy, surface);
        if (!EGL.defaultDisplayInitialized) {
          EGL.setErrorCode(
            12289
            /* EGL_NOT_INITIALIZED */
          );
        } else if (!GLctx) {
          EGL.setErrorCode(
            12290
            /* EGL_BAD_ACCESS */
          );
        } else if (GLctx.isContextLost()) {
          EGL.setErrorCode(
            12302
            /* EGL_CONTEXT_LOST */
          );
        } else {
          EGL.setErrorCode(
            12288
            /* EGL_SUCCESS */
          );
          return 1;
        }
        return 0;
      }
      var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
        MainLoop.func = iterFunc;
        MainLoop.arg = arg;
        var thisMainLoopId = MainLoop.currentlyRunningMainloop;
        function checkIsRunning() {
          if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
            runtimeKeepalivePop();
            maybeExit();
            return false;
          }
          return true;
        }
        MainLoop.running = false;
        MainLoop.runner = function MainLoop_runner() {
          if (ABORT) return;
          if (MainLoop.queue.length > 0) {
            var start = Date.now();
            var blocker = MainLoop.queue.shift();
            blocker.func(blocker.arg);
            if (MainLoop.remainingBlockers) {
              var remaining = MainLoop.remainingBlockers;
              var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
              if (blocker.counted) {
                MainLoop.remainingBlockers = next;
              } else {
                next = next + 0.5;
                MainLoop.remainingBlockers = (8 * remaining + next) / 9;
              }
            }
            MainLoop.updateStatus();
            if (!checkIsRunning()) return;
            setTimeout(MainLoop.runner, 0);
            return;
          }
          if (!checkIsRunning()) return;
          MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
          if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
            MainLoop.scheduler();
            return;
          } else if (MainLoop.timingMode == 0) {
            MainLoop.tickStartTime = _emscripten_get_now();
          }
          MainLoop.runIter(iterFunc);
          if (!checkIsRunning()) return;
          MainLoop.scheduler();
        };
        if (!noSetTiming) {
          if (fps > 0) {
            _emscripten_set_main_loop_timing(0, 1e3 / fps);
          } else {
            _emscripten_set_main_loop_timing(1, 1);
          }
          MainLoop.scheduler();
        }
        if (simulateInfiniteLoop) {
          throw "unwind";
        }
      };
      var MainLoop = {
        running: false,
        scheduler: null,
        method: "",
        currentlyRunningMainloop: 0,
        func: null,
        arg: 0,
        timingMode: 0,
        timingValue: 0,
        currentFrameNumber: 0,
        queue: [],
        preMainLoop: [],
        postMainLoop: [],
        pause() {
          MainLoop.scheduler = null;
          MainLoop.currentlyRunningMainloop++;
        },
        resume() {
          MainLoop.currentlyRunningMainloop++;
          var timingMode = MainLoop.timingMode;
          var timingValue = MainLoop.timingValue;
          var func = MainLoop.func;
          MainLoop.func = null;
          setMainLoop(func, 0, false, MainLoop.arg, true);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          MainLoop.scheduler();
        },
        updateStatus() {
          if (Module["setStatus"]) {
            var message = Module["statusMessage"] || "Please wait...";
            var remaining = MainLoop.remainingBlockers ?? 0;
            var expected = MainLoop.expectedBlockers ?? 0;
            if (remaining) {
              if (remaining < expected) {
                Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
              } else {
                Module["setStatus"](message);
              }
            } else {
              Module["setStatus"]("");
            }
          }
        },
        init() {
          Module["preMainLoop"] && MainLoop.preMainLoop.push(Module["preMainLoop"]);
          Module["postMainLoop"] && MainLoop.postMainLoop.push(Module["postMainLoop"]);
        },
        runIter(func) {
          if (ABORT) return;
          for (var pre of MainLoop.preMainLoop) {
            if (pre() === false) {
              return;
            }
          }
          callUserCallback(func);
          for (var post of MainLoop.postMainLoop) {
            post();
          }
        },
        nextRAF: 0,
        fakeRequestAnimationFrame(func) {
          var now = Date.now();
          if (MainLoop.nextRAF === 0) {
            MainLoop.nextRAF = now + 1e3 / 60;
          } else {
            while (now + 2 >= MainLoop.nextRAF) {
              MainLoop.nextRAF += 1e3 / 60;
            }
          }
          var delay = Math.max(MainLoop.nextRAF - now, 0);
          setTimeout(func, delay);
        },
        requestAnimationFrame(func) {
          if (typeof requestAnimationFrame == "function") {
            requestAnimationFrame(func);
            return;
          }
          var RAF = MainLoop.fakeRequestAnimationFrame;
          RAF(func);
        }
      };
      var _emscripten_set_main_loop_timing = (mode, value) => {
        MainLoop.timingMode = mode;
        MainLoop.timingValue = value;
        if (!MainLoop.func) {
          return 1;
        }
        if (!MainLoop.running) {
          runtimeKeepalivePush();
          MainLoop.running = true;
        }
        if (mode == 0) {
          MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
            var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
            setTimeout(MainLoop.runner, timeUntilNextTick);
          };
          MainLoop.method = "timeout";
        } else if (mode == 1) {
          MainLoop.scheduler = function MainLoop_scheduler_rAF() {
            MainLoop.requestAnimationFrame(MainLoop.runner);
          };
          MainLoop.method = "rAF";
        } else if (mode == 2) {
          if (typeof MainLoop.setImmediate == "undefined") {
            if (typeof setImmediate == "undefined") {
              var setImmediates = [];
              var emscriptenMainLoopMessageId = "setimmediate";
              var MainLoop_setImmediate_messageHandler = (event2) => {
                if (event2.data === emscriptenMainLoopMessageId || event2.data.target === emscriptenMainLoopMessageId) {
                  event2.stopPropagation();
                  setImmediates.shift()();
                }
              };
              addEventListener("message", MainLoop_setImmediate_messageHandler, true);
              MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */
              (func) => {
                setImmediates.push(func);
                if (ENVIRONMENT_IS_WORKER) {
                  Module["setImmediates"] ??= [];
                  Module["setImmediates"].push(func);
                  postMessage({ target: emscriptenMainLoopMessageId });
                } else postMessage(emscriptenMainLoopMessageId, "*");
              };
            } else {
              MainLoop.setImmediate = setImmediate;
            }
          }
          MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
            MainLoop.setImmediate(MainLoop.runner);
          };
          MainLoop.method = "immediate";
        }
        return 0;
      };
      function _eglSwapInterval(display, interval) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(34, 0, 1, display, interval);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        if (interval == 0) _emscripten_set_main_loop_timing(0, 0);
        else _emscripten_set_main_loop_timing(1, interval);
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 1;
      }
      function _eglTerminate(display) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(35, 0, 1, display);
        if (display != 62e3) {
          EGL.setErrorCode(
            12296
            /* EGL_BAD_DISPLAY */
          );
          return 0;
        }
        EGL.currentContext = 0;
        EGL.currentReadSurface = 0;
        EGL.currentDrawSurface = 0;
        EGL.defaultDisplayInitialized = false;
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 1;
      }
      function _eglWaitClient() {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(36, 0, 1);
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 1;
      }
      var _eglWaitGL = _eglWaitClient;
      function _eglWaitNative(nativeEngineId) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(37, 0, 1, nativeEngineId);
        EGL.setErrorCode(
          12288
          /* EGL_SUCCESS */
        );
        return 1;
      }
      var readEmAsmArgsArray = [];
      var readEmAsmArgs = (sigPtr, buf) => {
        readEmAsmArgsArray.length = 0;
        var ch;
        while (ch = HEAPU8[sigPtr++]) {
          var wide = ch != 105;
          wide &= ch != 112;
          buf += wide && buf % 8 ? 4 : 0;
          readEmAsmArgsArray.push(
            // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
            ch == 112 ? HEAPU32[buf >> 2] : ch == 106 ? HEAP64[buf >> 3] : ch == 105 ? HEAP32[buf >> 2] : HEAPF64[buf >> 3]
          );
          buf += wide ? 8 : 4;
        }
        return readEmAsmArgsArray;
      };
      var runEmAsmFunction = (code, sigPtr, argbuf) => {
        var args = readEmAsmArgs(sigPtr, argbuf);
        return ASM_CONSTS[code](...args);
      };
      var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
        return runEmAsmFunction(code, sigPtr, argbuf);
      };
      var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
        var args = readEmAsmArgs(sigPtr, argbuf);
        if (ENVIRONMENT_IS_PTHREAD) {
          return proxyToMainThread(0, emAsmAddr, sync, ...args);
        }
        return ASM_CONSTS[emAsmAddr](...args);
      };
      var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
      var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
      var _emscripten_cancel_main_loop = () => {
        MainLoop.pause();
        MainLoop.func = null;
      };
      var _emscripten_check_blocking_allowed = () => {
      };
      var onExits = [];
      var addOnExit = (cb) => onExits.unshift(cb);
      var JSEvents = {
        memcpy(target, src, size) {
          HEAP8.set(HEAP8.subarray(src, src + size), target);
        },
        removeAllEventListeners() {
          while (JSEvents.eventHandlers.length) {
            JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
          }
          JSEvents.deferredCalls = [];
        },
        inEventHandler: 0,
        deferredCalls: [],
        deferCall(targetFunction, precedence, argsList) {
          function arraysHaveEqualContent(arrA, arrB) {
            if (arrA.length != arrB.length) return false;
            for (var i2 in arrA) {
              if (arrA[i2] != arrB[i2]) return false;
            }
            return true;
          }
          for (var call of JSEvents.deferredCalls) {
            if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
              return;
            }
          }
          JSEvents.deferredCalls.push({
            targetFunction,
            precedence,
            argsList
          });
          JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
        },
        removeDeferredCalls(targetFunction) {
          JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
        },
        canPerformEventHandlerRequests() {
          if (navigator.userActivation) {
            return navigator.userActivation.isActive;
          }
          return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
        },
        runDeferredCalls() {
          if (!JSEvents.canPerformEventHandlerRequests()) {
            return;
          }
          var deferredCalls = JSEvents.deferredCalls;
          JSEvents.deferredCalls = [];
          for (var call of deferredCalls) {
            call.targetFunction(...call.argsList);
          }
        },
        eventHandlers: [],
        removeAllHandlersOnTarget: (target, eventTypeString) => {
          for (var i2 = 0; i2 < JSEvents.eventHandlers.length; ++i2) {
            if (JSEvents.eventHandlers[i2].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i2].eventTypeString)) {
              JSEvents._removeHandler(i2--);
            }
          }
        },
        _removeHandler(i2) {
          var h = JSEvents.eventHandlers[i2];
          h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
          JSEvents.eventHandlers.splice(i2, 1);
        },
        registerOrRemoveHandler(eventHandler) {
          if (!eventHandler.target) {
            return -4;
          }
          if (eventHandler.callbackfunc) {
            eventHandler.eventListenerFunc = function(event2) {
              ++JSEvents.inEventHandler;
              JSEvents.currentEventHandler = eventHandler;
              JSEvents.runDeferredCalls();
              eventHandler.handlerFunc(event2);
              JSEvents.runDeferredCalls();
              --JSEvents.inEventHandler;
            };
            eventHandler.target.addEventListener(
              eventHandler.eventTypeString,
              eventHandler.eventListenerFunc,
              eventHandler.useCapture
            );
            JSEvents.eventHandlers.push(eventHandler);
          } else {
            for (var i2 = 0; i2 < JSEvents.eventHandlers.length; ++i2) {
              if (JSEvents.eventHandlers[i2].target == eventHandler.target && JSEvents.eventHandlers[i2].eventTypeString == eventHandler.eventTypeString) {
                JSEvents._removeHandler(i2--);
              }
            }
          }
          return 0;
        },
        getTargetThreadForEventCallback(targetThread) {
          switch (targetThread) {
            case 1:
              return 0;
            case 2:
              return PThread.currentProxiedOperationCallerThread;
            default:
              return targetThread;
          }
        },
        getNodeNameForTarget(target) {
          if (!target) return "";
          if (target == window) return "#window";
          if (target == screen) return "#screen";
          return target?.nodeName || "";
        },
        fullscreenEnabled() {
          return document.fullscreenEnabled || document.webkitFullscreenEnabled;
        }
      };
      var currentFullscreenStrategy = {};
      var maybeCStringToJsString = (cString) => {
        return cString > 2 ? UTF8ToString(cString) : cString;
      };
      var specialHTMLTargets = [0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0];
      var findEventTarget = (target) => {
        target = maybeCStringToJsString(target);
        var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : null);
        return domElement;
      };
      var findCanvasEventTarget = findEventTarget;
      var getCanvasSizeCallingThread = (target, width, height) => {
        var canvas = findCanvasEventTarget(target);
        if (!canvas) return -4;
        if (!canvas.controlTransferredOffscreen) {
          HEAP32[width >> 2] = canvas.width;
          HEAP32[height >> 2] = canvas.height;
        } else {
          return -4;
        }
        return 0;
      };
      function getCanvasSizeMainThread(target, width, height) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(39, 0, 1, target, width, height);
        return getCanvasSizeCallingThread(target, width, height);
      }
      var _emscripten_get_canvas_element_size = (target, width, height) => {
        var canvas = findCanvasEventTarget(target);
        if (canvas) {
          return getCanvasSizeCallingThread(target, width, height);
        }
        return getCanvasSizeMainThread(target, width, height);
      };
      var stringToUTF8OnStack = (str) => {
        var size = lengthBytesUTF8(str) + 1;
        var ret = stackAlloc(size);
        stringToUTF8(str, ret, size);
        return ret;
      };
      var getCanvasElementSize = (target) => {
        var sp = stackSave();
        var w = stackAlloc(8);
        var h = w + 4;
        var targetInt = stringToUTF8OnStack(target.id);
        var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
        var size = [HEAP32[w >> 2], HEAP32[h >> 2]];
        stackRestore(sp);
        return size;
      };
      var setCanvasElementSizeCallingThread = (target, width, height) => {
        var canvas = findCanvasEventTarget(target);
        if (!canvas) return -4;
        if (!canvas.controlTransferredOffscreen) {
          var autoResizeViewport = false;
          if (canvas.GLctxObject?.GLctx) {
            var prevViewport = canvas.GLctxObject.GLctx.getParameter(
              2978
              /* GL_VIEWPORT */
            );
            autoResizeViewport = prevViewport[0] === 0 && prevViewport[1] === 0 && prevViewport[2] === canvas.width && prevViewport[3] === canvas.height;
          }
          canvas.width = width;
          canvas.height = height;
          if (autoResizeViewport) {
            canvas.GLctxObject.GLctx.viewport(0, 0, width, height);
          }
        } else {
          return -4;
        }
        return 0;
      };
      function setCanvasElementSizeMainThread(target, width, height) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(40, 0, 1, target, width, height);
        return setCanvasElementSizeCallingThread(target, width, height);
      }
      var _emscripten_set_canvas_element_size = (target, width, height) => {
        var canvas = findCanvasEventTarget(target);
        if (canvas) {
          return setCanvasElementSizeCallingThread(target, width, height);
        }
        return setCanvasElementSizeMainThread(target, width, height);
      };
      var setCanvasElementSize = (target, width, height) => {
        if (!target.controlTransferredOffscreen) {
          target.width = width;
          target.height = height;
        } else {
          var sp = stackSave();
          var targetInt = stringToUTF8OnStack(target.id);
          _emscripten_set_canvas_element_size(targetInt, width, height);
          stackRestore(sp);
        }
      };
      var registerRestoreOldStyle = (canvas) => {
        var canvasSize = getCanvasElementSize(canvas);
        var oldWidth = canvasSize[0];
        var oldHeight = canvasSize[1];
        var oldCssWidth = canvas.style.width;
        var oldCssHeight = canvas.style.height;
        var oldBackgroundColor = canvas.style.backgroundColor;
        var oldDocumentBackgroundColor = document.body.style.backgroundColor;
        var oldPaddingLeft = canvas.style.paddingLeft;
        var oldPaddingRight = canvas.style.paddingRight;
        var oldPaddingTop = canvas.style.paddingTop;
        var oldPaddingBottom = canvas.style.paddingBottom;
        var oldMarginLeft = canvas.style.marginLeft;
        var oldMarginRight = canvas.style.marginRight;
        var oldMarginTop = canvas.style.marginTop;
        var oldMarginBottom = canvas.style.marginBottom;
        var oldDocumentBodyMargin = document.body.style.margin;
        var oldDocumentOverflow = document.documentElement.style.overflow;
        var oldDocumentScroll = document.body.scroll;
        var oldImageRendering = canvas.style.imageRendering;
        function restoreOldStyle() {
          var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
          if (!fullscreenElement) {
            document.removeEventListener("fullscreenchange", restoreOldStyle);
            document.removeEventListener("webkitfullscreenchange", restoreOldStyle);
            setCanvasElementSize(canvas, oldWidth, oldHeight);
            canvas.style.width = oldCssWidth;
            canvas.style.height = oldCssHeight;
            canvas.style.backgroundColor = oldBackgroundColor;
            if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = "white";
            document.body.style.backgroundColor = oldDocumentBackgroundColor;
            canvas.style.paddingLeft = oldPaddingLeft;
            canvas.style.paddingRight = oldPaddingRight;
            canvas.style.paddingTop = oldPaddingTop;
            canvas.style.paddingBottom = oldPaddingBottom;
            canvas.style.marginLeft = oldMarginLeft;
            canvas.style.marginRight = oldMarginRight;
            canvas.style.marginTop = oldMarginTop;
            canvas.style.marginBottom = oldMarginBottom;
            document.body.style.margin = oldDocumentBodyMargin;
            document.documentElement.style.overflow = oldDocumentOverflow;
            document.body.scroll = oldDocumentScroll;
            canvas.style.imageRendering = oldImageRendering;
            if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
            if (currentFullscreenStrategy.canvasResizedCallback) {
              if (currentFullscreenStrategy.canvasResizedCallbackTargetThread) __emscripten_run_callback_on_thread(currentFullscreenStrategy.canvasResizedCallbackTargetThread, currentFullscreenStrategy.canvasResizedCallback, 37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
              else
                getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
            }
          }
        }
        document.addEventListener("fullscreenchange", restoreOldStyle);
        document.addEventListener("webkitfullscreenchange", restoreOldStyle);
        return restoreOldStyle;
      };
      var setLetterbox = (element, topBottom, leftRight) => {
        element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
        element.style.paddingTop = element.style.paddingBottom = topBottom + "px";
      };
      var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : { "left": 0, "top": 0 };
      var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
        var restoreOldStyle = registerRestoreOldStyle(target);
        var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
        var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
        var rect = getBoundingClientRect(target);
        var windowedCssWidth = rect.width;
        var windowedCssHeight = rect.height;
        var canvasSize = getCanvasElementSize(target);
        var windowedRttWidth = canvasSize[0];
        var windowedRttHeight = canvasSize[1];
        if (strategy.scaleMode == 3) {
          setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
          cssWidth = windowedCssWidth;
          cssHeight = windowedCssHeight;
        } else if (strategy.scaleMode == 2) {
          if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
            var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
            setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
            cssHeight = desiredCssHeight;
          } else {
            var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
            setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
            cssWidth = desiredCssWidth;
          }
        }
        target.style.backgroundColor ||= "black";
        document.body.style.backgroundColor ||= "black";
        target.style.width = cssWidth + "px";
        target.style.height = cssHeight + "px";
        if (strategy.filteringMode == 1) {
          target.style.imageRendering = "optimizeSpeed";
          target.style.imageRendering = "-moz-crisp-edges";
          target.style.imageRendering = "-o-crisp-edges";
          target.style.imageRendering = "-webkit-optimize-contrast";
          target.style.imageRendering = "optimize-contrast";
          target.style.imageRendering = "crisp-edges";
          target.style.imageRendering = "pixelated";
        }
        var dpiScale = strategy.canvasResolutionScaleMode == 2 ? devicePixelRatio : 1;
        if (strategy.canvasResolutionScaleMode != 0) {
          var newWidth = cssWidth * dpiScale | 0;
          var newHeight = cssHeight * dpiScale | 0;
          setCanvasElementSize(target, newWidth, newHeight);
          if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
        }
        return restoreOldStyle;
      };
      var JSEvents_requestFullscreen = (target, strategy) => {
        if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
          JSEvents_resizeCanvasForFullscreen(target, strategy);
        }
        if (target.requestFullscreen) {
          target.requestFullscreen();
        } else if (target.webkitRequestFullscreen) {
          target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else {
          return JSEvents.fullscreenEnabled() ? -3 : -1;
        }
        currentFullscreenStrategy = strategy;
        if (strategy.canvasResizedCallback) {
          if (strategy.canvasResizedCallbackTargetThread) __emscripten_run_callback_on_thread(strategy.canvasResizedCallbackTargetThread, strategy.canvasResizedCallback, 37, 0, strategy.canvasResizedCallbackUserData);
          else
            getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
        }
        return 0;
      };
      function _emscripten_exit_fullscreen() {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(38, 0, 1);
        if (!JSEvents.fullscreenEnabled()) return -1;
        JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
        var d = specialHTMLTargets[1];
        if (d.exitFullscreen) {
          d.fullscreenElement && d.exitFullscreen();
        } else if (d.webkitExitFullscreen) {
          d.webkitFullscreenElement && d.webkitExitFullscreen();
        } else {
          return -1;
        }
        return 0;
      }
      var requestPointerLock = (target) => {
        if (target.requestPointerLock) {
          target.requestPointerLock();
        } else {
          if (document.body.requestPointerLock) {
            return -3;
          }
          return -1;
        }
        return 0;
      };
      function _emscripten_exit_pointerlock() {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(41, 0, 1);
        JSEvents.removeDeferredCalls(requestPointerLock);
        if (document.exitPointerLock) {
          document.exitPointerLock();
        } else {
          return -1;
        }
        return 0;
      }
      var _emscripten_exit_with_live_runtime = () => {
        runtimeKeepalivePush();
        throw "unwind";
      };
      function _emscripten_force_exit(status) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(42, 0, 1, status);
        __emscripten_runtime_keepalive_clear();
        _exit(status);
      }
      function _emscripten_get_device_pixel_ratio() {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(43, 0, 1);
        return devicePixelRatio;
      }
      function _emscripten_get_element_css_size(target, width, height) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(44, 0, 1, target, width, height);
        target = findEventTarget(target);
        if (!target) return -4;
        var rect = getBoundingClientRect(target);
        HEAPF64[width >> 3] = rect.width;
        HEAPF64[height >> 3] = rect.height;
        return 0;
      }
      var fillGamepadEventData = (eventStruct, e) => {
        HEAPF64[eventStruct >> 3] = e.timestamp;
        for (var i2 = 0; i2 < e.axes.length; ++i2) {
          HEAPF64[eventStruct + i2 * 8 + 16 >> 3] = e.axes[i2];
        }
        for (var i2 = 0; i2 < e.buttons.length; ++i2) {
          if (typeof e.buttons[i2] == "object") {
            HEAPF64[eventStruct + i2 * 8 + 528 >> 3] = e.buttons[i2].value;
          } else {
            HEAPF64[eventStruct + i2 * 8 + 528 >> 3] = e.buttons[i2];
          }
        }
        for (var i2 = 0; i2 < e.buttons.length; ++i2) {
          if (typeof e.buttons[i2] == "object") {
            HEAP8[eventStruct + i2 + 1040] = e.buttons[i2].pressed;
          } else {
            HEAP8[eventStruct + i2 + 1040] = e.buttons[i2] == 1;
          }
        }
        HEAP8[eventStruct + 1104] = e.connected;
        HEAP32[eventStruct + 1108 >> 2] = e.index;
        HEAP32[eventStruct + 8 >> 2] = e.axes.length;
        HEAP32[eventStruct + 12 >> 2] = e.buttons.length;
        stringToUTF8(e.id, eventStruct + 1112, 64);
        stringToUTF8(e.mapping, eventStruct + 1176, 64);
      };
      function _emscripten_get_gamepad_status(index, gamepadState) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(45, 0, 1, index, gamepadState);
        if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
        if (!JSEvents.lastGamepadState[index]) return -7;
        fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
        return 0;
      }
      var _emscripten_get_main_loop_timing = (mode, value) => {
        if (mode) HEAP32[mode >> 2] = MainLoop.timingMode;
        if (value) HEAP32[value >> 2] = MainLoop.timingValue;
      };
      function _emscripten_get_num_gamepads() {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(46, 0, 1);
        return JSEvents.lastGamepadState.length;
      }
      function _emscripten_get_screen_size(width, height) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(47, 0, 1, width, height);
        HEAP32[width >> 2] = screen.width;
        HEAP32[height >> 2] = screen.height;
      }
      var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
      var _emscripten_glActiveTexture = _glActiveTexture;
      var _glAttachShader = (program, shader) => {
        GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
      };
      var _emscripten_glAttachShader = _glAttachShader;
      var _glBeginQuery = (target, id) => {
        GLctx.beginQuery(target, GL.queries[id]);
      };
      var _emscripten_glBeginQuery = _glBeginQuery;
      var _glBeginQueryEXT = (target, id) => {
        GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
      };
      var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;
      var _glBeginTransformFeedback = (x0) => GLctx.beginTransformFeedback(x0);
      var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;
      var _glBindAttribLocation = (program, index, name) => {
        GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
      };
      var _emscripten_glBindAttribLocation = _glBindAttribLocation;
      var _glBindBuffer = (target, buffer) => {
        if (target == 35051) {
          GLctx.currentPixelPackBufferBinding = buffer;
        } else if (target == 35052) {
          GLctx.currentPixelUnpackBufferBinding = buffer;
        }
        GLctx.bindBuffer(target, GL.buffers[buffer]);
      };
      var _emscripten_glBindBuffer = _glBindBuffer;
      var _glBindBufferBase = (target, index, buffer) => {
        GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
      };
      var _emscripten_glBindBufferBase = _glBindBufferBase;
      var _glBindBufferRange = (target, index, buffer, offset, ptrsize) => {
        GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
      };
      var _emscripten_glBindBufferRange = _glBindBufferRange;
      var _glBindFramebuffer = (target, framebuffer) => {
        GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
      };
      var _emscripten_glBindFramebuffer = _glBindFramebuffer;
      var _glBindRenderbuffer = (target, renderbuffer) => {
        GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
      };
      var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;
      var _glBindSampler = (unit, sampler) => {
        GLctx.bindSampler(unit, GL.samplers[sampler]);
      };
      var _emscripten_glBindSampler = _glBindSampler;
      var _glBindTexture = (target, texture) => {
        GLctx.bindTexture(target, GL.textures[texture]);
      };
      var _emscripten_glBindTexture = _glBindTexture;
      var _glBindTransformFeedback = (target, id) => {
        GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id]);
      };
      var _emscripten_glBindTransformFeedback = _glBindTransformFeedback;
      var _glBindVertexArray = (vao) => {
        GLctx.bindVertexArray(GL.vaos[vao]);
      };
      var _emscripten_glBindVertexArray = _glBindVertexArray;
      var _glBindVertexArrayOES = _glBindVertexArray;
      var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;
      var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
      var _emscripten_glBlendColor = _glBlendColor;
      var _glBlendEquation = (x0) => GLctx.blendEquation(x0);
      var _emscripten_glBlendEquation = _glBlendEquation;
      var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
      var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;
      var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
      var _emscripten_glBlendFunc = _glBlendFunc;
      var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
      var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;
      var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);
      var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;
      var _glBufferData = (target, size, data, usage) => {
        if (true) {
          if (data && size) {
            GLctx.bufferData(target, HEAPU8, usage, data, size);
          } else {
            GLctx.bufferData(target, size, usage);
          }
          return;
        }
      };
      var _emscripten_glBufferData = _glBufferData;
      var _glBufferSubData = (target, offset, size, data) => {
        if (true) {
          size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
          return;
        }
      };
      var _emscripten_glBufferSubData = _glBufferSubData;
      var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
      var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;
      var _glClear = (x0) => GLctx.clear(x0);
      var _emscripten_glClear = _glClear;
      var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);
      var _emscripten_glClearBufferfi = _glClearBufferfi;
      var _glClearBufferfv = (buffer, drawbuffer, value) => {
        GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, value >> 2);
      };
      var _emscripten_glClearBufferfv = _glClearBufferfv;
      var _glClearBufferiv = (buffer, drawbuffer, value) => {
        GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, value >> 2);
      };
      var _emscripten_glClearBufferiv = _glClearBufferiv;
      var _glClearBufferuiv = (buffer, drawbuffer, value) => {
        GLctx.clearBufferuiv(buffer, drawbuffer, HEAPU32, value >> 2);
      };
      var _emscripten_glClearBufferuiv = _glClearBufferuiv;
      var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
      var _emscripten_glClearColor = _glClearColor;
      var _glClearDepthf = (x0) => GLctx.clearDepth(x0);
      var _emscripten_glClearDepthf = _glClearDepthf;
      var _glClearStencil = (x0) => GLctx.clearStencil(x0);
      var _emscripten_glClearStencil = _glClearStencil;
      var _glClientWaitSync = (sync, flags, timeout) => {
        timeout = Number(timeout);
        return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
      };
      var _emscripten_glClientWaitSync = _glClientWaitSync;
      var _glClipControlEXT = (origin, depth) => {
        GLctx.extClipControl["clipControlEXT"](origin, depth);
      };
      var _emscripten_glClipControlEXT = _glClipControlEXT;
      var _glColorMask = (red, green, blue, alpha) => {
        GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
      };
      var _emscripten_glColorMask = _glColorMask;
      var _glCompileShader = (shader) => {
        GLctx.compileShader(GL.shaders[shader]);
      };
      var _emscripten_glCompileShader = _glCompileShader;
      var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
        if (true) {
          if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
            GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
            return;
          }
          GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
          return;
        }
      };
      var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;
      var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
        } else {
          GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
        }
      };
      var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;
      var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
        if (true) {
          if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
            GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
            return;
          }
          GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8, data, imageSize);
          return;
        }
      };
      var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;
      var _glCompressedTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
        } else {
          GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, HEAPU8, data, imageSize);
        }
      };
      var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;
      var _glCopyBufferSubData = (x0, x1, x2, x3, x4) => GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
      var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;
      var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
      var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;
      var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
      var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;
      var _glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) => GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);
      var _emscripten_glCopyTexSubImage3D = _glCopyTexSubImage3D;
      var _glCreateProgram = () => {
        var id = GL.getNewId(GL.programs);
        var program = GLctx.createProgram();
        program.name = id;
        program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
        program.uniformIdCounter = 1;
        GL.programs[id] = program;
        return id;
      };
      var _emscripten_glCreateProgram = _glCreateProgram;
      var _glCreateShader = (shaderType) => {
        var id = GL.getNewId(GL.shaders);
        GL.shaders[id] = GLctx.createShader(shaderType);
        return id;
      };
      var _emscripten_glCreateShader = _glCreateShader;
      var _glCullFace = (x0) => GLctx.cullFace(x0);
      var _emscripten_glCullFace = _glCullFace;
      var _glDeleteBuffers = (n, buffers) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[buffers + i2 * 4 >> 2];
          var buffer = GL.buffers[id];
          if (!buffer) continue;
          GLctx.deleteBuffer(buffer);
          buffer.name = 0;
          GL.buffers[id] = null;
          if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
          if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
        }
      };
      var _emscripten_glDeleteBuffers = _glDeleteBuffers;
      var _glDeleteFramebuffers = (n, framebuffers) => {
        for (var i2 = 0; i2 < n; ++i2) {
          var id = HEAP32[framebuffers + i2 * 4 >> 2];
          var framebuffer = GL.framebuffers[id];
          if (!framebuffer) continue;
          GLctx.deleteFramebuffer(framebuffer);
          framebuffer.name = 0;
          GL.framebuffers[id] = null;
        }
      };
      var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;
      var _glDeleteProgram = (id) => {
        if (!id) return;
        var program = GL.programs[id];
        if (!program) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        GLctx.deleteProgram(program);
        program.name = 0;
        GL.programs[id] = null;
      };
      var _emscripten_glDeleteProgram = _glDeleteProgram;
      var _glDeleteQueries = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[ids + i2 * 4 >> 2];
          var query = GL.queries[id];
          if (!query) continue;
          GLctx.deleteQuery(query);
          GL.queries[id] = null;
        }
      };
      var _emscripten_glDeleteQueries = _glDeleteQueries;
      var _glDeleteQueriesEXT = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[ids + i2 * 4 >> 2];
          var query = GL.queries[id];
          if (!query) continue;
          GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
          GL.queries[id] = null;
        }
      };
      var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;
      var _glDeleteRenderbuffers = (n, renderbuffers) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[renderbuffers + i2 * 4 >> 2];
          var renderbuffer = GL.renderbuffers[id];
          if (!renderbuffer) continue;
          GLctx.deleteRenderbuffer(renderbuffer);
          renderbuffer.name = 0;
          GL.renderbuffers[id] = null;
        }
      };
      var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;
      var _glDeleteSamplers = (n, samplers) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[samplers + i2 * 4 >> 2];
          var sampler = GL.samplers[id];
          if (!sampler) continue;
          GLctx.deleteSampler(sampler);
          sampler.name = 0;
          GL.samplers[id] = null;
        }
      };
      var _emscripten_glDeleteSamplers = _glDeleteSamplers;
      var _glDeleteShader = (id) => {
        if (!id) return;
        var shader = GL.shaders[id];
        if (!shader) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        GLctx.deleteShader(shader);
        GL.shaders[id] = null;
      };
      var _emscripten_glDeleteShader = _glDeleteShader;
      var _glDeleteSync = (id) => {
        if (!id) return;
        var sync = GL.syncs[id];
        if (!sync) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        GLctx.deleteSync(sync);
        sync.name = 0;
        GL.syncs[id] = null;
      };
      var _emscripten_glDeleteSync = _glDeleteSync;
      var _glDeleteTextures = (n, textures) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[textures + i2 * 4 >> 2];
          var texture = GL.textures[id];
          if (!texture) continue;
          GLctx.deleteTexture(texture);
          texture.name = 0;
          GL.textures[id] = null;
        }
      };
      var _emscripten_glDeleteTextures = _glDeleteTextures;
      var _glDeleteTransformFeedbacks = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[ids + i2 * 4 >> 2];
          var transformFeedback = GL.transformFeedbacks[id];
          if (!transformFeedback) continue;
          GLctx.deleteTransformFeedback(transformFeedback);
          transformFeedback.name = 0;
          GL.transformFeedbacks[id] = null;
        }
      };
      var _emscripten_glDeleteTransformFeedbacks = _glDeleteTransformFeedbacks;
      var _glDeleteVertexArrays = (n, vaos) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[vaos + i2 * 4 >> 2];
          GLctx.deleteVertexArray(GL.vaos[id]);
          GL.vaos[id] = null;
        }
      };
      var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;
      var _glDeleteVertexArraysOES = _glDeleteVertexArrays;
      var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;
      var _glDepthFunc = (x0) => GLctx.depthFunc(x0);
      var _emscripten_glDepthFunc = _glDepthFunc;
      var _glDepthMask = (flag) => {
        GLctx.depthMask(!!flag);
      };
      var _emscripten_glDepthMask = _glDepthMask;
      var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
      var _emscripten_glDepthRangef = _glDepthRangef;
      var _glDetachShader = (program, shader) => {
        GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
      };
      var _emscripten_glDetachShader = _glDetachShader;
      var _glDisable = (x0) => GLctx.disable(x0);
      var _emscripten_glDisable = _glDisable;
      var _glDisableVertexAttribArray = (index) => {
        GLctx.disableVertexAttribArray(index);
      };
      var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;
      var _glDrawArrays = (mode, first, count) => {
        GLctx.drawArrays(mode, first, count);
      };
      var _emscripten_glDrawArrays = _glDrawArrays;
      var _glDrawArraysInstanced = (mode, first, count, primcount) => {
        GLctx.drawArraysInstanced(mode, first, count, primcount);
      };
      var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;
      var _glDrawArraysInstancedANGLE = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstancedANGLE;
      var _glDrawArraysInstancedARB = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedARB = _glDrawArraysInstancedARB;
      var _glDrawArraysInstancedEXT = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedEXT = _glDrawArraysInstancedEXT;
      var _glDrawArraysInstancedNV = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedNV = _glDrawArraysInstancedNV;
      var tempFixedLengthArray = [];
      var _glDrawBuffers = (n, bufs) => {
        var bufArray = tempFixedLengthArray[n];
        for (var i2 = 0; i2 < n; i2++) {
          bufArray[i2] = HEAP32[bufs + i2 * 4 >> 2];
        }
        GLctx.drawBuffers(bufArray);
      };
      var _emscripten_glDrawBuffers = _glDrawBuffers;
      var _glDrawBuffersEXT = _glDrawBuffers;
      var _emscripten_glDrawBuffersEXT = _glDrawBuffersEXT;
      var _glDrawBuffersWEBGL = _glDrawBuffers;
      var _emscripten_glDrawBuffersWEBGL = _glDrawBuffersWEBGL;
      var _glDrawElements = (mode, count, type, indices) => {
        GLctx.drawElements(mode, count, type, indices);
      };
      var _emscripten_glDrawElements = _glDrawElements;
      var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
        GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
      };
      var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;
      var _glDrawElementsInstancedANGLE = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstancedANGLE;
      var _glDrawElementsInstancedARB = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedARB = _glDrawElementsInstancedARB;
      var _glDrawElementsInstancedEXT = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedEXT = _glDrawElementsInstancedEXT;
      var _glDrawElementsInstancedNV = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedNV = _glDrawElementsInstancedNV;
      var _glDrawRangeElements = (mode, start, end, count, type, indices) => {
        _glDrawElements(mode, count, type, indices);
      };
      var _emscripten_glDrawRangeElements = _glDrawRangeElements;
      var _glEnable = (x0) => GLctx.enable(x0);
      var _emscripten_glEnable = _glEnable;
      var _glEnableVertexAttribArray = (index) => {
        GLctx.enableVertexAttribArray(index);
      };
      var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;
      var _glEndQuery = (x0) => GLctx.endQuery(x0);
      var _emscripten_glEndQuery = _glEndQuery;
      var _glEndQueryEXT = (target) => {
        GLctx.disjointTimerQueryExt["endQueryEXT"](target);
      };
      var _emscripten_glEndQueryEXT = _glEndQueryEXT;
      var _glEndTransformFeedback = () => GLctx.endTransformFeedback();
      var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;
      var _glFenceSync = (condition, flags) => {
        var sync = GLctx.fenceSync(condition, flags);
        if (sync) {
          var id = GL.getNewId(GL.syncs);
          sync.name = id;
          GL.syncs[id] = sync;
          return id;
        }
        return 0;
      };
      var _emscripten_glFenceSync = _glFenceSync;
      var _glFinish = () => GLctx.finish();
      var _emscripten_glFinish = _glFinish;
      var _glFlush = () => GLctx.flush();
      var _emscripten_glFlush = _glFlush;
      var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
        GLctx.framebufferRenderbuffer(
          target,
          attachment,
          renderbuffertarget,
          GL.renderbuffers[renderbuffer]
        );
      };
      var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;
      var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
        GLctx.framebufferTexture2D(
          target,
          attachment,
          textarget,
          GL.textures[texture],
          level
        );
      };
      var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;
      var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
        GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
      };
      var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;
      var _glFrontFace = (x0) => GLctx.frontFace(x0);
      var _emscripten_glFrontFace = _glFrontFace;
      var _glGenBuffers = (n, buffers) => {
        GL.genObject(
          n,
          buffers,
          "createBuffer",
          GL.buffers
        );
      };
      var _emscripten_glGenBuffers = _glGenBuffers;
      var _glGenFramebuffers = (n, ids) => {
        GL.genObject(
          n,
          ids,
          "createFramebuffer",
          GL.framebuffers
        );
      };
      var _emscripten_glGenFramebuffers = _glGenFramebuffers;
      var _glGenQueries = (n, ids) => {
        GL.genObject(
          n,
          ids,
          "createQuery",
          GL.queries
        );
      };
      var _emscripten_glGenQueries = _glGenQueries;
      var _glGenQueriesEXT = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
          if (!query) {
            GL.recordError(
              1282
              /* GL_INVALID_OPERATION */
            );
            while (i2 < n) HEAP32[ids + i2++ * 4 >> 2] = 0;
            return;
          }
          var id = GL.getNewId(GL.queries);
          query.name = id;
          GL.queries[id] = query;
          HEAP32[ids + i2 * 4 >> 2] = id;
        }
      };
      var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;
      var _glGenRenderbuffers = (n, renderbuffers) => {
        GL.genObject(
          n,
          renderbuffers,
          "createRenderbuffer",
          GL.renderbuffers
        );
      };
      var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;
      var _glGenSamplers = (n, samplers) => {
        GL.genObject(
          n,
          samplers,
          "createSampler",
          GL.samplers
        );
      };
      var _emscripten_glGenSamplers = _glGenSamplers;
      var _glGenTextures = (n, textures) => {
        GL.genObject(
          n,
          textures,
          "createTexture",
          GL.textures
        );
      };
      var _emscripten_glGenTextures = _glGenTextures;
      var _glGenTransformFeedbacks = (n, ids) => {
        GL.genObject(
          n,
          ids,
          "createTransformFeedback",
          GL.transformFeedbacks
        );
      };
      var _emscripten_glGenTransformFeedbacks = _glGenTransformFeedbacks;
      var _glGenVertexArrays = (n, arrays) => {
        GL.genObject(
          n,
          arrays,
          "createVertexArray",
          GL.vaos
        );
      };
      var _emscripten_glGenVertexArrays = _glGenVertexArrays;
      var _glGenVertexArraysOES = _glGenVertexArrays;
      var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;
      var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
      var _emscripten_glGenerateMipmap = _glGenerateMipmap;
      var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
        program = GL.programs[program];
        var info = GLctx[funcName](program, index);
        if (info) {
          var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
          if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
          if (size) HEAP32[size >> 2] = info.size;
          if (type) HEAP32[type >> 2] = info.type;
        }
      };
      var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
      var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;
      var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
      var _emscripten_glGetActiveUniform = _glGetActiveUniform;
      var _glGetActiveUniformBlockName = (program, uniformBlockIndex, bufSize, length, uniformBlockName) => {
        program = GL.programs[program];
        var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
        if (!result) return;
        if (uniformBlockName && bufSize > 0) {
          var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
          if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
        } else {
          if (length) HEAP32[length >> 2] = 0;
        }
      };
      var _emscripten_glGetActiveUniformBlockName = _glGetActiveUniformBlockName;
      var _glGetActiveUniformBlockiv = (program, uniformBlockIndex, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        program = GL.programs[program];
        if (pname == 35393) {
          var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
          HEAP32[params >> 2] = name.length + 1;
          return;
        }
        var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
        if (result === null) return;
        if (pname == 35395) {
          for (var i2 = 0; i2 < result.length; i2++) {
            HEAP32[params + i2 * 4 >> 2] = result[i2];
          }
        } else {
          HEAP32[params >> 2] = result;
        }
      };
      var _emscripten_glGetActiveUniformBlockiv = _glGetActiveUniformBlockiv;
      var _glGetActiveUniformsiv = (program, uniformCount, uniformIndices, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        if (uniformCount > 0 && uniformIndices == 0) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        program = GL.programs[program];
        var ids = [];
        for (var i2 = 0; i2 < uniformCount; i2++) {
          ids.push(HEAP32[uniformIndices + i2 * 4 >> 2]);
        }
        var result = GLctx.getActiveUniforms(program, ids, pname);
        if (!result) return;
        var len = result.length;
        for (var i2 = 0; i2 < len; i2++) {
          HEAP32[params + i2 * 4 >> 2] = result[i2];
        }
      };
      var _emscripten_glGetActiveUniformsiv = _glGetActiveUniformsiv;
      var _glGetAttachedShaders = (program, maxCount, count, shaders) => {
        var result = GLctx.getAttachedShaders(GL.programs[program]);
        var len = result.length;
        if (len > maxCount) {
          len = maxCount;
        }
        HEAP32[count >> 2] = len;
        for (var i2 = 0; i2 < len; ++i2) {
          var id = GL.shaders.indexOf(result[i2]);
          HEAP32[shaders + i2 * 4 >> 2] = id;
        }
      };
      var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;
      var _glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
      var _emscripten_glGetAttribLocation = _glGetAttribLocation;
      var writeI53ToI64 = (ptr, num) => {
        HEAPU32[ptr >> 2] = num;
        var lower = HEAPU32[ptr >> 2];
        HEAPU32[ptr + 4 >> 2] = (num - lower) / 4294967296;
      };
      var webglGetExtensions = () => {
        var exts = getEmscriptenSupportedExtensions(GLctx);
        exts = exts.concat(exts.map((e) => "GL_" + e));
        return exts;
      };
      var emscriptenWebGLGet = (name_, p, type) => {
        if (!p) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var ret = void 0;
        switch (name_) {
          // Handle a few trivial GLES values
          case 36346:
            ret = 1;
            break;
          case 36344:
            if (type != 0 && type != 1) {
              GL.recordError(1280);
            }
            return;
          case 34814:
          // GL_NUM_PROGRAM_BINARY_FORMATS
          case 36345:
            ret = 0;
            break;
          case 34466:
            var formats = GLctx.getParameter(
              34467
              /*GL_COMPRESSED_TEXTURE_FORMATS*/
            );
            ret = formats ? formats.length : 0;
            break;
          case 33309:
            if (GL.currentContext.version < 2) {
              GL.recordError(
                1282
                /* GL_INVALID_OPERATION */
              );
              return;
            }
            ret = webglGetExtensions().length;
            break;
          case 33307:
          // GL_MAJOR_VERSION
          case 33308:
            if (GL.currentContext.version < 2) {
              GL.recordError(1280);
              return;
            }
            ret = name_ == 33307 ? 3 : 0;
            break;
        }
        if (ret === void 0) {
          var result = GLctx.getParameter(name_);
          switch (typeof result) {
            case "number":
              ret = result;
              break;
            case "boolean":
              ret = result ? 1 : 0;
              break;
            case "string":
              GL.recordError(1280);
              return;
            case "object":
              if (result === null) {
                switch (name_) {
                  case 34964:
                  // ARRAY_BUFFER_BINDING
                  case 35725:
                  // CURRENT_PROGRAM
                  case 34965:
                  // ELEMENT_ARRAY_BUFFER_BINDING
                  case 36006:
                  // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                  case 36007:
                  // RENDERBUFFER_BINDING
                  case 32873:
                  // TEXTURE_BINDING_2D
                  case 34229:
                  // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                  case 36662:
                  // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                  case 36663:
                  // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                  case 35053:
                  // PIXEL_PACK_BUFFER_BINDING
                  case 35055:
                  // PIXEL_UNPACK_BUFFER_BINDING
                  case 36010:
                  // READ_FRAMEBUFFER_BINDING
                  case 35097:
                  // SAMPLER_BINDING
                  case 35869:
                  // TEXTURE_BINDING_2D_ARRAY
                  case 32874:
                  // TEXTURE_BINDING_3D
                  case 36389:
                  // TRANSFORM_FEEDBACK_BINDING
                  case 35983:
                  // TRANSFORM_FEEDBACK_BUFFER_BINDING
                  case 35368:
                  // UNIFORM_BUFFER_BINDING
                  case 34068: {
                    ret = 0;
                    break;
                  }
                  default: {
                    GL.recordError(1280);
                    return;
                  }
                }
              } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
                for (var i2 = 0; i2 < result.length; ++i2) {
                  switch (type) {
                    case 0:
                      HEAP32[p + i2 * 4 >> 2] = result[i2];
                      break;
                    case 2:
                      HEAPF32[p + i2 * 4 >> 2] = result[i2];
                      break;
                    case 4:
                      HEAP8[p + i2] = result[i2] ? 1 : 0;
                      break;
                  }
                }
                return;
              } else {
                try {
                  ret = result.name | 0;
                } catch (e) {
                  GL.recordError(1280);
                  err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                  return;
                }
              }
              break;
            default:
              GL.recordError(1280);
              err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`);
              return;
          }
        }
        switch (type) {
          case 1:
            writeI53ToI64(p, ret);
            break;
          case 0:
            HEAP32[p >> 2] = ret;
            break;
          case 2:
            HEAPF32[p >> 2] = ret;
            break;
          case 4:
            HEAP8[p] = ret ? 1 : 0;
            break;
        }
      };
      var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
      var _emscripten_glGetBooleanv = _glGetBooleanv;
      var _glGetBufferParameteri64v = (target, value, data) => {
        if (!data) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        writeI53ToI64(data, GLctx.getBufferParameter(target, value));
      };
      var _emscripten_glGetBufferParameteri64v = _glGetBufferParameteri64v;
      var _glGetBufferParameteriv = (target, value, data) => {
        if (!data) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAP32[data >> 2] = GLctx.getBufferParameter(target, value);
      };
      var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;
      var _glGetError = () => {
        var error = GLctx.getError() || GL.lastError;
        GL.lastError = 0;
        return error;
      };
      var _emscripten_glGetError = _glGetError;
      var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
      var _emscripten_glGetFloatv = _glGetFloatv;
      var _glGetFragDataLocation = (program, name) => {
        return GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
      };
      var _emscripten_glGetFragDataLocation = _glGetFragDataLocation;
      var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
        var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
        if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
          result = result.name | 0;
        }
        HEAP32[params >> 2] = result;
      };
      var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;
      var emscriptenWebGLGetIndexed = (target, index, data, type) => {
        if (!data) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var result = GLctx.getIndexedParameter(target, index);
        var ret;
        switch (typeof result) {
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "number":
            ret = result;
            break;
          case "object":
            if (result === null) {
              switch (target) {
                case 35983:
                // TRANSFORM_FEEDBACK_BUFFER_BINDING
                case 35368:
                  ret = 0;
                  break;
                default: {
                  GL.recordError(1280);
                  return;
                }
              }
            } else if (result instanceof WebGLBuffer) {
              ret = result.name | 0;
            } else {
              GL.recordError(1280);
              return;
            }
            break;
          default:
            GL.recordError(1280);
            return;
        }
        switch (type) {
          case 1:
            writeI53ToI64(data, ret);
            break;
          case 0:
            HEAP32[data >> 2] = ret;
            break;
          case 2:
            HEAPF32[data >> 2] = ret;
            break;
          case 4:
            HEAP8[data] = ret ? 1 : 0;
            break;
          default:
            throw "internal emscriptenWebGLGetIndexed() error, bad type: " + type;
        }
      };
      var _glGetInteger64i_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 1);
      var _emscripten_glGetInteger64i_v = _glGetInteger64i_v;
      var _glGetInteger64v = (name_, p) => {
        emscriptenWebGLGet(name_, p, 1);
      };
      var _emscripten_glGetInteger64v = _glGetInteger64v;
      var _glGetIntegeri_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 0);
      var _emscripten_glGetIntegeri_v = _glGetIntegeri_v;
      var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
      var _emscripten_glGetIntegerv = _glGetIntegerv;
      var _glGetInternalformativ = (target, internalformat, pname, bufSize, params) => {
        if (bufSize < 0) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
        if (ret === null) return;
        for (var i2 = 0; i2 < ret.length && i2 < bufSize; ++i2) {
          HEAP32[params + i2 * 4 >> 2] = ret[i2];
        }
      };
      var _emscripten_glGetInternalformativ = _glGetInternalformativ;
      var _glGetProgramBinary = (program, bufSize, length, binaryFormat, binary) => {
        GL.recordError(
          1282
          /*GL_INVALID_OPERATION*/
        );
      };
      var _emscripten_glGetProgramBinary = _glGetProgramBinary;
      var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
        var log = GLctx.getProgramInfoLog(GL.programs[program]);
        if (log === null) log = "(unknown error)";
        var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
      };
      var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;
      var _glGetProgramiv = (program, pname, p) => {
        if (!p) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        if (program >= GL.counter) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        program = GL.programs[program];
        if (pname == 35716) {
          var log = GLctx.getProgramInfoLog(program);
          if (log === null) log = "(unknown error)";
          HEAP32[p >> 2] = log.length + 1;
        } else if (pname == 35719) {
          if (!program.maxUniformLength) {
            var numActiveUniforms = GLctx.getProgramParameter(
              program,
              35718
              /*GL_ACTIVE_UNIFORMS*/
            );
            for (var i2 = 0; i2 < numActiveUniforms; ++i2) {
              program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i2).name.length + 1);
            }
          }
          HEAP32[p >> 2] = program.maxUniformLength;
        } else if (pname == 35722) {
          if (!program.maxAttributeLength) {
            var numActiveAttributes = GLctx.getProgramParameter(
              program,
              35721
              /*GL_ACTIVE_ATTRIBUTES*/
            );
            for (var i2 = 0; i2 < numActiveAttributes; ++i2) {
              program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i2).name.length + 1);
            }
          }
          HEAP32[p >> 2] = program.maxAttributeLength;
        } else if (pname == 35381) {
          if (!program.maxUniformBlockNameLength) {
            var numActiveUniformBlocks = GLctx.getProgramParameter(
              program,
              35382
              /*GL_ACTIVE_UNIFORM_BLOCKS*/
            );
            for (var i2 = 0; i2 < numActiveUniformBlocks; ++i2) {
              program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i2).length + 1);
            }
          }
          HEAP32[p >> 2] = program.maxUniformBlockNameLength;
        } else {
          HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname);
        }
      };
      var _emscripten_glGetProgramiv = _glGetProgramiv;
      var _glGetQueryObjecti64vEXT = (id, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var query = GL.queries[id];
        var param;
        if (GL.currentContext.version < 2) {
          param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
        } else {
          param = GLctx.getQueryParameter(query, pname);
        }
        var ret;
        if (typeof param == "boolean") {
          ret = param ? 1 : 0;
        } else {
          ret = param;
        }
        writeI53ToI64(params, ret);
      };
      var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;
      var _glGetQueryObjectivEXT = (id, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var query = GL.queries[id];
        var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
        var ret;
        if (typeof param == "boolean") {
          ret = param ? 1 : 0;
        } else {
          ret = param;
        }
        HEAP32[params >> 2] = ret;
      };
      var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;
      var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
      var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;
      var _glGetQueryObjectuiv = (id, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var query = GL.queries[id];
        var param = GLctx.getQueryParameter(query, pname);
        var ret;
        if (typeof param == "boolean") {
          ret = param ? 1 : 0;
        } else {
          ret = param;
        }
        HEAP32[params >> 2] = ret;
      };
      var _emscripten_glGetQueryObjectuiv = _glGetQueryObjectuiv;
      var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
      var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;
      var _glGetQueryiv = (target, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAP32[params >> 2] = GLctx.getQuery(target, pname);
      };
      var _emscripten_glGetQueryiv = _glGetQueryiv;
      var _glGetQueryivEXT = (target, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAP32[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
      };
      var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;
      var _glGetRenderbufferParameteriv = (target, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname);
      };
      var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;
      var _glGetSamplerParameterfv = (sampler, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAPF32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
      };
      var _emscripten_glGetSamplerParameterfv = _glGetSamplerParameterfv;
      var _glGetSamplerParameteriv = (sampler, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAP32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
      };
      var _emscripten_glGetSamplerParameteriv = _glGetSamplerParameteriv;
      var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = "(unknown error)";
        var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
      };
      var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;
      var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
        var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
        HEAP32[range >> 2] = result.rangeMin;
        HEAP32[range + 4 >> 2] = result.rangeMax;
        HEAP32[precision >> 2] = result.precision;
      };
      var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;
      var _glGetShaderSource = (shader, bufSize, length, source) => {
        var result = GLctx.getShaderSource(GL.shaders[shader]);
        if (!result) return;
        var numBytesWrittenExclNull = bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0;
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
      };
      var _emscripten_glGetShaderSource = _glGetShaderSource;
      var _glGetShaderiv = (shader, pname, p) => {
        if (!p) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        if (pname == 35716) {
          var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
          if (log === null) log = "(unknown error)";
          var logLength = log ? log.length + 1 : 0;
          HEAP32[p >> 2] = logLength;
        } else if (pname == 35720) {
          var source = GLctx.getShaderSource(GL.shaders[shader]);
          var sourceLength = source ? source.length + 1 : 0;
          HEAP32[p >> 2] = sourceLength;
        } else {
          HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
        }
      };
      var _emscripten_glGetShaderiv = _glGetShaderiv;
      var _glGetString = (name_) => {
        var ret = GL.stringCache[name_];
        if (!ret) {
          switch (name_) {
            case 7939:
              ret = stringToNewUTF8(webglGetExtensions().join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              var s = GLctx.getParameter(name_);
              if (!s) {
                GL.recordError(
                  1280
                  /*GL_INVALID_ENUM*/
                );
              }
              ret = s ? stringToNewUTF8(s) : 0;
              break;
            case 7938:
              var webGLVersion = GLctx.getParameter(
                7938
                /*GL_VERSION*/
              );
              var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
              if (true) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
              ret = stringToNewUTF8(glVersion);
              break;
            case 35724:
              var glslVersion = GLctx.getParameter(
                35724
                /*GL_SHADING_LANGUAGE_VERSION*/
              );
              var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
              var ver_num = glslVersion.match(ver_re);
              if (ver_num !== null) {
                if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
                glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
              }
              ret = stringToNewUTF8(glslVersion);
              break;
            default:
              GL.recordError(
                1280
                /*GL_INVALID_ENUM*/
              );
          }
          GL.stringCache[name_] = ret;
        }
        return ret;
      };
      var _emscripten_glGetString = _glGetString;
      var _glGetStringi = (name, index) => {
        if (GL.currentContext.version < 2) {
          GL.recordError(
            1282
            /* GL_INVALID_OPERATION */
          );
          return 0;
        }
        var stringiCache = GL.stringiCache[name];
        if (stringiCache) {
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(
              1281
              /*GL_INVALID_VALUE*/
            );
            return 0;
          }
          return stringiCache[index];
        }
        switch (name) {
          case 7939:
            var exts = webglGetExtensions().map(stringToNewUTF8);
            stringiCache = GL.stringiCache[name] = exts;
            if (index < 0 || index >= stringiCache.length) {
              GL.recordError(
                1281
                /*GL_INVALID_VALUE*/
              );
              return 0;
            }
            return stringiCache[index];
          default:
            GL.recordError(
              1280
              /*GL_INVALID_ENUM*/
            );
            return 0;
        }
      };
      var _emscripten_glGetStringi = _glGetStringi;
      var _glGetSynciv = (sync, pname, bufSize, length, values) => {
        if (bufSize < 0) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        if (!values) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
        if (ret !== null) {
          HEAP32[values >> 2] = ret;
          if (length) HEAP32[length >> 2] = 1;
        }
      };
      var _emscripten_glGetSynciv = _glGetSynciv;
      var _glGetTexParameterfv = (target, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname);
      };
      var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;
      var _glGetTexParameteriv = (target, pname, params) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAP32[params >> 2] = GLctx.getTexParameter(target, pname);
      };
      var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;
      var _glGetTransformFeedbackVarying = (program, index, bufSize, length, size, type, name) => {
        program = GL.programs[program];
        var info = GLctx.getTransformFeedbackVarying(program, index);
        if (!info) return;
        if (name && bufSize > 0) {
          var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
          if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
        } else {
          if (length) HEAP32[length >> 2] = 0;
        }
        if (size) HEAP32[size >> 2] = info.size;
        if (type) HEAP32[type >> 2] = info.type;
      };
      var _emscripten_glGetTransformFeedbackVarying = _glGetTransformFeedbackVarying;
      var _glGetUniformBlockIndex = (program, uniformBlockName) => {
        return GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
      };
      var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;
      var _glGetUniformIndices = (program, uniformCount, uniformNames, uniformIndices) => {
        if (!uniformIndices) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        program = GL.programs[program];
        var names = [];
        for (var i2 = 0; i2 < uniformCount; i2++)
          names.push(UTF8ToString(HEAP32[uniformNames + i2 * 4 >> 2]));
        var result = GLctx.getUniformIndices(program, names);
        if (!result) return;
        var len = result.length;
        for (var i2 = 0; i2 < len; i2++) {
          HEAP32[uniformIndices + i2 * 4 >> 2] = result[i2];
        }
      };
      var _emscripten_glGetUniformIndices = _glGetUniformIndices;
      var jstoi_q = (str) => parseInt(str);
      var webglGetLeftBracePos = (name) => name.slice(-1) == "]" && name.lastIndexOf("[");
      var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
        var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i2, j;
        if (!uniformLocsById) {
          program.uniformLocsById = uniformLocsById = {};
          program.uniformArrayNamesById = {};
          var numActiveUniforms = GLctx.getProgramParameter(
            program,
            35718
            /*GL_ACTIVE_UNIFORMS*/
          );
          for (i2 = 0; i2 < numActiveUniforms; ++i2) {
            var u = GLctx.getActiveUniform(program, i2);
            var nm = u.name;
            var sz = u.size;
            var lb = webglGetLeftBracePos(nm);
            var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
            var id = program.uniformIdCounter;
            program.uniformIdCounter += sz;
            uniformSizeAndIdsByName[arrayName] = [sz, id];
            for (j = 0; j < sz; ++j) {
              uniformLocsById[id] = j;
              program.uniformArrayNamesById[id++] = arrayName;
            }
          }
        }
      };
      var _glGetUniformLocation = (program, name) => {
        name = UTF8ToString(name);
        if (program = GL.programs[program]) {
          webglPrepareUniformLocationsBeforeFirstUse(program);
          var uniformLocsById = program.uniformLocsById;
          var arrayIndex = 0;
          var uniformBaseName = name;
          var leftBrace = webglGetLeftBracePos(name);
          if (leftBrace > 0) {
            arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
            uniformBaseName = name.slice(0, leftBrace);
          }
          var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
          if (sizeAndId && arrayIndex < sizeAndId[0]) {
            arrayIndex += sizeAndId[1];
            if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
              return arrayIndex;
            }
          }
        } else {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
        }
        return -1;
      };
      var _emscripten_glGetUniformLocation = _glGetUniformLocation;
      var webglGetUniformLocation = (location) => {
        var p = GLctx.currentProgram;
        if (p) {
          var webglLoc = p.uniformLocsById[location];
          if (typeof webglLoc == "number") {
            p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
          }
          return webglLoc;
        } else {
          GL.recordError(
            1282
            /*GL_INVALID_OPERATION*/
          );
        }
      };
      var emscriptenWebGLGetUniform = (program, location, params, type) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        program = GL.programs[program];
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var data = GLctx.getUniform(program, webglGetUniformLocation(location));
        if (typeof data == "number" || typeof data == "boolean") {
          switch (type) {
            case 0:
              HEAP32[params >> 2] = data;
              break;
            case 2:
              HEAPF32[params >> 2] = data;
              break;
          }
        } else {
          for (var i2 = 0; i2 < data.length; i2++) {
            switch (type) {
              case 0:
                HEAP32[params + i2 * 4 >> 2] = data[i2];
                break;
              case 2:
                HEAPF32[params + i2 * 4 >> 2] = data[i2];
                break;
            }
          }
        }
      };
      var _glGetUniformfv = (program, location, params) => {
        emscriptenWebGLGetUniform(program, location, params, 2);
      };
      var _emscripten_glGetUniformfv = _glGetUniformfv;
      var _glGetUniformiv = (program, location, params) => {
        emscriptenWebGLGetUniform(program, location, params, 0);
      };
      var _emscripten_glGetUniformiv = _glGetUniformiv;
      var _glGetUniformuiv = (program, location, params) => emscriptenWebGLGetUniform(program, location, params, 0);
      var _emscripten_glGetUniformuiv = _glGetUniformuiv;
      var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
        if (!params) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        var data = GLctx.getVertexAttrib(index, pname);
        if (pname == 34975) {
          HEAP32[params >> 2] = data && data["name"];
        } else if (typeof data == "number" || typeof data == "boolean") {
          switch (type) {
            case 0:
              HEAP32[params >> 2] = data;
              break;
            case 2:
              HEAPF32[params >> 2] = data;
              break;
            case 5:
              HEAP32[params >> 2] = Math.fround(data);
              break;
          }
        } else {
          for (var i2 = 0; i2 < data.length; i2++) {
            switch (type) {
              case 0:
                HEAP32[params + i2 * 4 >> 2] = data[i2];
                break;
              case 2:
                HEAPF32[params + i2 * 4 >> 2] = data[i2];
                break;
              case 5:
                HEAP32[params + i2 * 4 >> 2] = Math.fround(data[i2]);
                break;
            }
          }
        }
      };
      var _glGetVertexAttribIiv = (index, pname, params) => {
        emscriptenWebGLGetVertexAttrib(index, pname, params, 0);
      };
      var _emscripten_glGetVertexAttribIiv = _glGetVertexAttribIiv;
      var _glGetVertexAttribIuiv = _glGetVertexAttribIiv;
      var _emscripten_glGetVertexAttribIuiv = _glGetVertexAttribIuiv;
      var _glGetVertexAttribPointerv = (index, pname, pointer) => {
        if (!pointer) {
          GL.recordError(
            1281
            /* GL_INVALID_VALUE */
          );
          return;
        }
        HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname);
      };
      var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;
      var _glGetVertexAttribfv = (index, pname, params) => {
        emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
      };
      var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;
      var _glGetVertexAttribiv = (index, pname, params) => {
        emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
      };
      var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;
      var _glHint = (x0, x1) => GLctx.hint(x0, x1);
      var _emscripten_glHint = _glHint;
      var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
        var list = tempFixedLengthArray[numAttachments];
        for (var i2 = 0; i2 < numAttachments; i2++) {
          list[i2] = HEAP32[attachments + i2 * 4 >> 2];
        }
        GLctx.invalidateFramebuffer(target, list);
      };
      var _emscripten_glInvalidateFramebuffer = _glInvalidateFramebuffer;
      var _glInvalidateSubFramebuffer = (target, numAttachments, attachments, x, y, width, height) => {
        var list = tempFixedLengthArray[numAttachments];
        for (var i2 = 0; i2 < numAttachments; i2++) {
          list[i2] = HEAP32[attachments + i2 * 4 >> 2];
        }
        GLctx.invalidateSubFramebuffer(target, list, x, y, width, height);
      };
      var _emscripten_glInvalidateSubFramebuffer = _glInvalidateSubFramebuffer;
      var _glIsBuffer = (buffer) => {
        var b = GL.buffers[buffer];
        if (!b) return 0;
        return GLctx.isBuffer(b);
      };
      var _emscripten_glIsBuffer = _glIsBuffer;
      var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
      var _emscripten_glIsEnabled = _glIsEnabled;
      var _glIsFramebuffer = (framebuffer) => {
        var fb = GL.framebuffers[framebuffer];
        if (!fb) return 0;
        return GLctx.isFramebuffer(fb);
      };
      var _emscripten_glIsFramebuffer = _glIsFramebuffer;
      var _glIsProgram = (program) => {
        program = GL.programs[program];
        if (!program) return 0;
        return GLctx.isProgram(program);
      };
      var _emscripten_glIsProgram = _glIsProgram;
      var _glIsQuery = (id) => {
        var query = GL.queries[id];
        if (!query) return 0;
        return GLctx.isQuery(query);
      };
      var _emscripten_glIsQuery = _glIsQuery;
      var _glIsQueryEXT = (id) => {
        var query = GL.queries[id];
        if (!query) return 0;
        return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
      };
      var _emscripten_glIsQueryEXT = _glIsQueryEXT;
      var _glIsRenderbuffer = (renderbuffer) => {
        var rb = GL.renderbuffers[renderbuffer];
        if (!rb) return 0;
        return GLctx.isRenderbuffer(rb);
      };
      var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;
      var _glIsSampler = (id) => {
        var sampler = GL.samplers[id];
        if (!sampler) return 0;
        return GLctx.isSampler(sampler);
      };
      var _emscripten_glIsSampler = _glIsSampler;
      var _glIsShader = (shader) => {
        var s = GL.shaders[shader];
        if (!s) return 0;
        return GLctx.isShader(s);
      };
      var _emscripten_glIsShader = _glIsShader;
      var _glIsSync = (sync) => GLctx.isSync(GL.syncs[sync]);
      var _emscripten_glIsSync = _glIsSync;
      var _glIsTexture = (id) => {
        var texture = GL.textures[id];
        if (!texture) return 0;
        return GLctx.isTexture(texture);
      };
      var _emscripten_glIsTexture = _glIsTexture;
      var _glIsTransformFeedback = (id) => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);
      var _emscripten_glIsTransformFeedback = _glIsTransformFeedback;
      var _glIsVertexArray = (array) => {
        var vao = GL.vaos[array];
        if (!vao) return 0;
        return GLctx.isVertexArray(vao);
      };
      var _emscripten_glIsVertexArray = _glIsVertexArray;
      var _glIsVertexArrayOES = _glIsVertexArray;
      var _emscripten_glIsVertexArrayOES = _glIsVertexArrayOES;
      var _glLineWidth = (x0) => GLctx.lineWidth(x0);
      var _emscripten_glLineWidth = _glLineWidth;
      var _glLinkProgram = (program) => {
        program = GL.programs[program];
        GLctx.linkProgram(program);
        program.uniformLocsById = 0;
        program.uniformSizeAndIdsByName = {};
      };
      var _emscripten_glLinkProgram = _glLinkProgram;
      var _glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();
      var _emscripten_glPauseTransformFeedback = _glPauseTransformFeedback;
      var _glPixelStorei = (pname, param) => {
        if (pname == 3317) {
          GL.unpackAlignment = param;
        } else if (pname == 3314) {
          GL.unpackRowLength = param;
        }
        GLctx.pixelStorei(pname, param);
      };
      var _emscripten_glPixelStorei = _glPixelStorei;
      var _glPolygonModeWEBGL = (face, mode) => {
        GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode);
      };
      var _emscripten_glPolygonModeWEBGL = _glPolygonModeWEBGL;
      var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
      var _emscripten_glPolygonOffset = _glPolygonOffset;
      var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
        GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp);
      };
      var _emscripten_glPolygonOffsetClampEXT = _glPolygonOffsetClampEXT;
      var _glProgramBinary = (program, binaryFormat, binary, length) => {
        GL.recordError(
          1280
          /*GL_INVALID_ENUM*/
        );
      };
      var _emscripten_glProgramBinary = _glProgramBinary;
      var _glProgramParameteri = (program, pname, value) => {
        GL.recordError(
          1280
          /*GL_INVALID_ENUM*/
        );
      };
      var _emscripten_glProgramParameteri = _glProgramParameteri;
      var _glQueryCounterEXT = (id, target) => {
        GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
      };
      var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;
      var _glReadBuffer = (x0) => GLctx.readBuffer(x0);
      var _emscripten_glReadBuffer = _glReadBuffer;
      var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
        function roundedToNextMultipleOf(x, y) {
          return x + y - 1 & -y;
        }
        var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
        return height * alignedRowSize;
      };
      var colorChannelsInGlTextureFormat = (format) => {
        var colorChannels = {
          // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
          // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
          5: 3,
          6: 4,
          // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
          8: 2,
          29502: 3,
          29504: 4,
          // 0x1903 /* GL_RED */ - 0x1902: 1,
          26917: 2,
          26918: 2,
          // 0x8D94 /* GL_RED_INTEGER */ - 0x1902: 1,
          29846: 3,
          29847: 4
        };
        return colorChannels[format - 6402] || 1;
      };
      var heapObjectForWebGLType = (type) => {
        type -= 5120;
        if (type == 0) return HEAP8;
        if (type == 1) return HEAPU8;
        if (type == 2) return HEAP16;
        if (type == 4) return HEAP32;
        if (type == 6) return HEAPF32;
        if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782)
          return HEAPU32;
        return HEAPU16;
      };
      var toTypedArrayIndex = (pointer, heap) => pointer >>> 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
      var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
        var heap = heapObjectForWebGLType(type);
        var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
        var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
        return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
      };
      var _glReadPixels = (x, y, width, height, format, type, pixels) => {
        if (true) {
          if (GLctx.currentPixelPackBufferBinding) {
            GLctx.readPixels(x, y, width, height, format, type, pixels);
            return;
          }
          var heap = heapObjectForWebGLType(type);
          var target = toTypedArrayIndex(pixels, heap);
          GLctx.readPixels(x, y, width, height, format, type, heap, target);
          return;
        }
      };
      var _emscripten_glReadPixels = _glReadPixels;
      var _glReleaseShaderCompiler = () => {
      };
      var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;
      var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
      var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;
      var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);
      var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;
      var _glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();
      var _emscripten_glResumeTransformFeedback = _glResumeTransformFeedback;
      var _glSampleCoverage = (value, invert) => {
        GLctx.sampleCoverage(value, !!invert);
      };
      var _emscripten_glSampleCoverage = _glSampleCoverage;
      var _glSamplerParameterf = (sampler, pname, param) => {
        GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameterf = _glSamplerParameterf;
      var _glSamplerParameterfv = (sampler, pname, params) => {
        var param = HEAPF32[params >> 2];
        GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameterfv = _glSamplerParameterfv;
      var _glSamplerParameteri = (sampler, pname, param) => {
        GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameteri = _glSamplerParameteri;
      var _glSamplerParameteriv = (sampler, pname, params) => {
        var param = HEAP32[params >> 2];
        GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameteriv = _glSamplerParameteriv;
      var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
      var _emscripten_glScissor = _glScissor;
      var _glShaderBinary = (count, shaders, binaryformat, binary, length) => {
        GL.recordError(
          1280
          /*GL_INVALID_ENUM*/
        );
      };
      var _emscripten_glShaderBinary = _glShaderBinary;
      var _glShaderSource = (shader, count, string, length) => {
        var source = GL.getSource(shader, count, string, length);
        GLctx.shaderSource(GL.shaders[shader], source);
      };
      var _emscripten_glShaderSource = _glShaderSource;
      var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
      var _emscripten_glStencilFunc = _glStencilFunc;
      var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
      var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;
      var _glStencilMask = (x0) => GLctx.stencilMask(x0);
      var _emscripten_glStencilMask = _glStencilMask;
      var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
      var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;
      var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
      var _emscripten_glStencilOp = _glStencilOp;
      var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
      var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;
      var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
        if (true) {
          if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
            return;
          }
          if (pixels) {
            var heap = heapObjectForWebGLType(type);
            var index = toTypedArrayIndex(pixels, heap);
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
            return;
          }
        }
        var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
        GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
      };
      var _emscripten_glTexImage2D = _glTexImage2D;
      var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap));
        } else {
          GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
        }
      };
      var _emscripten_glTexImage3D = _glTexImage3D;
      var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
      var _emscripten_glTexParameterf = _glTexParameterf;
      var _glTexParameterfv = (target, pname, params) => {
        var param = HEAPF32[params >> 2];
        GLctx.texParameterf(target, pname, param);
      };
      var _emscripten_glTexParameterfv = _glTexParameterfv;
      var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
      var _emscripten_glTexParameteri = _glTexParameteri;
      var _glTexParameteriv = (target, pname, params) => {
        var param = HEAP32[params >> 2];
        GLctx.texParameteri(target, pname, param);
      };
      var _emscripten_glTexParameteriv = _glTexParameteriv;
      var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);
      var _emscripten_glTexStorage2D = _glTexStorage2D;
      var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);
      var _emscripten_glTexStorage3D = _glTexStorage3D;
      var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
        if (true) {
          if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
            return;
          }
          if (pixels) {
            var heap = heapObjectForWebGLType(type);
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
            return;
          }
        }
        var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
        GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
      };
      var _emscripten_glTexSubImage2D = _glTexSubImage2D;
      var _glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
        } else {
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
        }
      };
      var _emscripten_glTexSubImage3D = _glTexSubImage3D;
      var _glTransformFeedbackVaryings = (program, count, varyings, bufferMode) => {
        program = GL.programs[program];
        var vars = [];
        for (var i2 = 0; i2 < count; i2++)
          vars.push(UTF8ToString(HEAP32[varyings + i2 * 4 >> 2]));
        GLctx.transformFeedbackVaryings(program, vars, bufferMode);
      };
      var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;
      var _glUniform1f = (location, v0) => {
        GLctx.uniform1f(webglGetUniformLocation(location), v0);
      };
      var _emscripten_glUniform1f = _glUniform1f;
      var _glUniform1fv = (location, count, value) => {
        count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count);
      };
      var _emscripten_glUniform1fv = _glUniform1fv;
      var _glUniform1i = (location, v0) => {
        GLctx.uniform1i(webglGetUniformLocation(location), v0);
      };
      var _emscripten_glUniform1i = _glUniform1i;
      var _glUniform1iv = (location, count, value) => {
        count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, value >> 2, count);
      };
      var _emscripten_glUniform1iv = _glUniform1iv;
      var _glUniform1ui = (location, v0) => {
        GLctx.uniform1ui(webglGetUniformLocation(location), v0);
      };
      var _emscripten_glUniform1ui = _glUniform1ui;
      var _glUniform1uiv = (location, count, value) => {
        count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count);
      };
      var _emscripten_glUniform1uiv = _glUniform1uiv;
      var _glUniform2f = (location, v0, v1) => {
        GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
      };
      var _emscripten_glUniform2f = _glUniform2f;
      var _glUniform2fv = (location, count, value) => {
        count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 2);
      };
      var _emscripten_glUniform2fv = _glUniform2fv;
      var _glUniform2i = (location, v0, v1) => {
        GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
      };
      var _emscripten_glUniform2i = _glUniform2i;
      var _glUniform2iv = (location, count, value) => {
        count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 2);
      };
      var _emscripten_glUniform2iv = _glUniform2iv;
      var _glUniform2ui = (location, v0, v1) => {
        GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1);
      };
      var _emscripten_glUniform2ui = _glUniform2ui;
      var _glUniform2uiv = (location, count, value) => {
        count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 2);
      };
      var _emscripten_glUniform2uiv = _glUniform2uiv;
      var _glUniform3f = (location, v0, v1, v2) => {
        GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
      };
      var _emscripten_glUniform3f = _glUniform3f;
      var _glUniform3fv = (location, count, value) => {
        count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 3);
      };
      var _emscripten_glUniform3fv = _glUniform3fv;
      var _glUniform3i = (location, v0, v1, v2) => {
        GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
      };
      var _emscripten_glUniform3i = _glUniform3i;
      var _glUniform3iv = (location, count, value) => {
        count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 3);
      };
      var _emscripten_glUniform3iv = _glUniform3iv;
      var _glUniform3ui = (location, v0, v1, v2) => {
        GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2);
      };
      var _emscripten_glUniform3ui = _glUniform3ui;
      var _glUniform3uiv = (location, count, value) => {
        count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 3);
      };
      var _emscripten_glUniform3uiv = _glUniform3uiv;
      var _glUniform4f = (location, v0, v1, v2, v3) => {
        GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
      };
      var _emscripten_glUniform4f = _glUniform4f;
      var _glUniform4fv = (location, count, value) => {
        count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 4);
      };
      var _emscripten_glUniform4fv = _glUniform4fv;
      var _glUniform4i = (location, v0, v1, v2, v3) => {
        GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
      };
      var _emscripten_glUniform4i = _glUniform4i;
      var _glUniform4iv = (location, count, value) => {
        count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 4);
      };
      var _emscripten_glUniform4iv = _glUniform4iv;
      var _glUniform4ui = (location, v0, v1, v2, v3) => {
        GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3);
      };
      var _emscripten_glUniform4ui = _glUniform4ui;
      var _glUniform4uiv = (location, count, value) => {
        count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 4);
      };
      var _emscripten_glUniform4uiv = _glUniform4uiv;
      var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
        program = GL.programs[program];
        GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
      };
      var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;
      var _glUniformMatrix2fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 4);
      };
      var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;
      var _glUniformMatrix2x3fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
      };
      var _emscripten_glUniformMatrix2x3fv = _glUniformMatrix2x3fv;
      var _glUniformMatrix2x4fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
      };
      var _emscripten_glUniformMatrix2x4fv = _glUniformMatrix2x4fv;
      var _glUniformMatrix3fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 9);
      };
      var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;
      var _glUniformMatrix3x2fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
      };
      var _emscripten_glUniformMatrix3x2fv = _glUniformMatrix3x2fv;
      var _glUniformMatrix3x4fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
      };
      var _emscripten_glUniformMatrix3x4fv = _glUniformMatrix3x4fv;
      var _glUniformMatrix4fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16);
      };
      var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;
      var _glUniformMatrix4x2fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
      };
      var _emscripten_glUniformMatrix4x2fv = _glUniformMatrix4x2fv;
      var _glUniformMatrix4x3fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
      };
      var _emscripten_glUniformMatrix4x3fv = _glUniformMatrix4x3fv;
      var _glUseProgram = (program) => {
        program = GL.programs[program];
        GLctx.useProgram(program);
        GLctx.currentProgram = program;
      };
      var _emscripten_glUseProgram = _glUseProgram;
      var _glValidateProgram = (program) => {
        GLctx.validateProgram(GL.programs[program]);
      };
      var _emscripten_glValidateProgram = _glValidateProgram;
      var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
      var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;
      var _glVertexAttrib1fv = (index, v) => {
        GLctx.vertexAttrib1f(index, HEAPF32[v >> 2]);
      };
      var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;
      var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
      var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;
      var _glVertexAttrib2fv = (index, v) => {
        GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2]);
      };
      var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;
      var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
      var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;
      var _glVertexAttrib3fv = (index, v) => {
        GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2]);
      };
      var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;
      var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
      var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;
      var _glVertexAttrib4fv = (index, v) => {
        GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2], HEAPF32[v + 12 >> 2]);
      };
      var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;
      var _glVertexAttribDivisor = (index, divisor) => {
        GLctx.vertexAttribDivisor(index, divisor);
      };
      var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;
      var _glVertexAttribDivisorANGLE = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisorANGLE;
      var _glVertexAttribDivisorARB = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorARB = _glVertexAttribDivisorARB;
      var _glVertexAttribDivisorEXT = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorEXT = _glVertexAttribDivisorEXT;
      var _glVertexAttribDivisorNV = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorNV = _glVertexAttribDivisorNV;
      var _glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);
      var _emscripten_glVertexAttribI4i = _glVertexAttribI4i;
      var _glVertexAttribI4iv = (index, v) => {
        GLctx.vertexAttribI4i(index, HEAP32[v >> 2], HEAP32[v + 4 >> 2], HEAP32[v + 8 >> 2], HEAP32[v + 12 >> 2]);
      };
      var _emscripten_glVertexAttribI4iv = _glVertexAttribI4iv;
      var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);
      var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;
      var _glVertexAttribI4uiv = (index, v) => {
        GLctx.vertexAttribI4ui(index, HEAPU32[v >> 2], HEAPU32[v + 4 >> 2], HEAPU32[v + 8 >> 2], HEAPU32[v + 12 >> 2]);
      };
      var _emscripten_glVertexAttribI4uiv = _glVertexAttribI4uiv;
      var _glVertexAttribIPointer = (index, size, type, stride, ptr) => {
        GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
      };
      var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;
      var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
        GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
      };
      var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;
      var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
      var _emscripten_glViewport = _glViewport;
      var _glWaitSync = (sync, flags, timeout) => {
        timeout = Number(timeout);
        GLctx.waitSync(GL.syncs[sync], flags, timeout);
      };
      var _emscripten_glWaitSync = _glWaitSync;
      var _emscripten_has_asyncify = () => 0;
      var _emscripten_pause_main_loop = () => MainLoop.pause();
      var doRequestFullscreen = (target, strategy) => {
        if (!JSEvents.fullscreenEnabled()) return -1;
        target = findEventTarget(target);
        if (!target) return -4;
        if (!target.requestFullscreen && !target.webkitRequestFullscreen) {
          return -3;
        }
        if (!JSEvents.canPerformEventHandlerRequests()) {
          if (strategy.deferUntilInEventHandler) {
            JSEvents.deferCall(JSEvents_requestFullscreen, 1, [target, strategy]);
            return 1;
          }
          return -2;
        }
        return JSEvents_requestFullscreen(target, strategy);
      };
      function _emscripten_request_fullscreen_strategy(target, deferUntilInEventHandler, fullscreenStrategy) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(48, 0, 1, target, deferUntilInEventHandler, fullscreenStrategy);
        var strategy = {
          scaleMode: HEAP32[fullscreenStrategy >> 2],
          canvasResolutionScaleMode: HEAP32[fullscreenStrategy + 4 >> 2],
          filteringMode: HEAP32[fullscreenStrategy + 8 >> 2],
          deferUntilInEventHandler,
          canvasResizedCallbackTargetThread: HEAP32[fullscreenStrategy + 20 >> 2],
          canvasResizedCallback: HEAP32[fullscreenStrategy + 12 >> 2],
          canvasResizedCallbackUserData: HEAP32[fullscreenStrategy + 16 >> 2]
        };
        return doRequestFullscreen(target, strategy);
      }
      function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(49, 0, 1, target, deferUntilInEventHandler);
        target = findEventTarget(target);
        if (!target) return -4;
        if (!target.requestPointerLock) {
          return -1;
        }
        if (!JSEvents.canPerformEventHandlerRequests()) {
          if (deferUntilInEventHandler) {
            JSEvents.deferCall(requestPointerLock, 2, [target]);
            return 1;
          }
          return -2;
        }
        return requestPointerLock(target);
      }
      var getHeapMax = () => HEAPU8.length;
      var abortOnCannotGrowMemory = (requestedSize) => {
        abort("OOM");
      };
      var _emscripten_resize_heap = (requestedSize) => {
        var oldSize = HEAPU8.length;
        requestedSize >>>= 0;
        abortOnCannotGrowMemory(requestedSize);
      };
      var _emscripten_resume_main_loop = () => MainLoop.resume();
      function _emscripten_sample_gamepad_data() {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(50, 0, 1);
        try {
          if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads()) ? 0 : -1;
        } catch (e) {
          navigator.getGamepads = null;
        }
        return -1;
      }
      var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
        var beforeUnloadEventHandlerFunc = (e = event) => {
          var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
          if (confirmationMessage) {
            confirmationMessage = UTF8ToString(confirmationMessage);
          }
          if (confirmationMessage) {
            e.preventDefault();
            e.returnValue = confirmationMessage;
            return confirmationMessage;
          }
        };
        var eventHandler = {
          target: findEventTarget(target),
          eventTypeString,
          callbackfunc,
          handlerFunc: beforeUnloadEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_beforeunload_callback_on_thread(userData, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(51, 0, 1, userData, callbackfunc, targetThread);
        if (typeof onbeforeunload == "undefined") return -1;
        if (targetThread !== 1) return -5;
        return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
      }
      var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.focusEvent ||= _malloc(256);
        var focusEventHandlerFunc = (e = event) => {
          var nodeName = JSEvents.getNodeNameForTarget(e.target);
          var id = e.target.id ? e.target.id : "";
          var focusEvent = targetThread ? _malloc(256) : JSEvents.focusEvent;
          stringToUTF8(nodeName, focusEvent + 0, 128);
          stringToUTF8(id, focusEvent + 128, 128);
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, focusEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target: findEventTarget(target),
          eventTypeString,
          callbackfunc,
          handlerFunc: focusEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_blur_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(52, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
      }
      function _emscripten_set_element_css_size(target, width, height) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(53, 0, 1, target, width, height);
        target = findEventTarget(target);
        if (!target) return -4;
        target.style.width = width + "px";
        target.style.height = height + "px";
        return 0;
      }
      function _emscripten_set_focus_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(54, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);
      }
      var fillFullscreenChangeEventData = (eventStruct) => {
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        var isFullscreen = !!fullscreenElement;
        HEAP8[eventStruct] = isFullscreen;
        HEAP8[eventStruct + 1] = JSEvents.fullscreenEnabled();
        var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
        var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
        var id = reportedElement?.id || "";
        stringToUTF8(nodeName, eventStruct + 2, 128);
        stringToUTF8(id, eventStruct + 130, 128);
        HEAP32[eventStruct + 260 >> 2] = reportedElement ? reportedElement.clientWidth : 0;
        HEAP32[eventStruct + 264 >> 2] = reportedElement ? reportedElement.clientHeight : 0;
        HEAP32[eventStruct + 268 >> 2] = screen.width;
        HEAP32[eventStruct + 272 >> 2] = screen.height;
        if (isFullscreen) {
          JSEvents.previousFullscreenElement = fullscreenElement;
        }
      };
      var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.fullscreenChangeEvent ||= _malloc(276);
        var fullscreenChangeEventhandlerFunc = (e = event) => {
          var fullscreenChangeEvent = targetThread ? _malloc(276) : JSEvents.fullscreenChangeEvent;
          fillFullscreenChangeEventData(fullscreenChangeEvent);
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, fullscreenChangeEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target,
          eventTypeString,
          callbackfunc,
          handlerFunc: fullscreenChangeEventhandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_fullscreenchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(55, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        if (!JSEvents.fullscreenEnabled()) return -1;
        target = findEventTarget(target);
        if (!target) return -4;
        registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
        return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
      }
      var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.gamepadEvent ||= _malloc(1240);
        var gamepadEventHandlerFunc = (e = event) => {
          var gamepadEvent = targetThread ? _malloc(1240) : JSEvents.gamepadEvent;
          fillGamepadEventData(gamepadEvent, e["gamepad"]);
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, gamepadEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target: findEventTarget(target),
          allowsDeferredCalls: true,
          eventTypeString,
          callbackfunc,
          handlerFunc: gamepadEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_gamepadconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(56, 0, 1, userData, useCapture, callbackfunc, targetThread);
        if (_emscripten_sample_gamepad_data()) return -1;
        return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
      }
      function _emscripten_set_gamepaddisconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(57, 0, 1, userData, useCapture, callbackfunc, targetThread);
        if (_emscripten_sample_gamepad_data()) return -1;
        return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
      }
      var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.keyEvent ||= _malloc(160);
        var keyEventHandlerFunc = (e) => {
          var keyEventData = targetThread ? _malloc(160) : JSEvents.keyEvent;
          HEAPF64[keyEventData >> 3] = e.timeStamp;
          var idx = keyEventData >> 2;
          HEAP32[idx + 2] = e.location;
          HEAP8[keyEventData + 12] = e.ctrlKey;
          HEAP8[keyEventData + 13] = e.shiftKey;
          HEAP8[keyEventData + 14] = e.altKey;
          HEAP8[keyEventData + 15] = e.metaKey;
          HEAP8[keyEventData + 16] = e.repeat;
          HEAP32[idx + 5] = e.charCode;
          HEAP32[idx + 6] = e.keyCode;
          HEAP32[idx + 7] = e.which;
          stringToUTF8(e.key || "", keyEventData + 32, 32);
          stringToUTF8(e.code || "", keyEventData + 64, 32);
          stringToUTF8(e.char || "", keyEventData + 96, 32);
          stringToUTF8(e.locale || "", keyEventData + 128, 32);
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, keyEventData, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
        };
        var eventHandler = {
          target: findEventTarget(target),
          eventTypeString,
          callbackfunc,
          handlerFunc: keyEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(58, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
      }
      function _emscripten_set_keypress_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(59, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
      }
      function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(60, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
      }
      var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
        var iterFunc = getWasmTableEntry(func);
        setMainLoop(iterFunc, fps, simulateInfiniteLoop);
      };
      var fillMouseEventData = (eventStruct, e, target) => {
        HEAPF64[eventStruct >> 3] = e.timeStamp;
        var idx = eventStruct >> 2;
        HEAP32[idx + 2] = e.screenX;
        HEAP32[idx + 3] = e.screenY;
        HEAP32[idx + 4] = e.clientX;
        HEAP32[idx + 5] = e.clientY;
        HEAP8[eventStruct + 24] = e.ctrlKey;
        HEAP8[eventStruct + 25] = e.shiftKey;
        HEAP8[eventStruct + 26] = e.altKey;
        HEAP8[eventStruct + 27] = e.metaKey;
        HEAP16[idx * 2 + 14] = e.button;
        HEAP16[idx * 2 + 15] = e.buttons;
        HEAP32[idx + 8] = e["movementX"];
        HEAP32[idx + 9] = e["movementY"];
        var rect = getBoundingClientRect(target);
        HEAP32[idx + 10] = e.clientX - (rect.left | 0);
        HEAP32[idx + 11] = e.clientY - (rect.top | 0);
      };
      var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.mouseEvent ||= _malloc(64);
        target = findEventTarget(target);
        var mouseEventHandlerFunc = (e = event) => {
          fillMouseEventData(JSEvents.mouseEvent, e, target);
          if (targetThread) {
            var mouseEventData = _malloc(64);
            fillMouseEventData(mouseEventData, e, target);
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, mouseEventData, userData);
          } else if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target,
          allowsDeferredCalls: eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
          // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
          eventTypeString,
          callbackfunc,
          handlerFunc: mouseEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_mousedown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(61, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);
      }
      function _emscripten_set_mouseenter_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(62, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);
      }
      function _emscripten_set_mouseleave_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(63, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);
      }
      function _emscripten_set_mousemove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(64, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
      }
      function _emscripten_set_mouseup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(65, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
      }
      var fillPointerlockChangeEventData = (eventStruct) => {
        var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
        var isPointerlocked = !!pointerLockElement;
        HEAP8[eventStruct] = isPointerlocked;
        var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
        var id = pointerLockElement?.id || "";
        stringToUTF8(nodeName, eventStruct + 1, 128);
        stringToUTF8(id, eventStruct + 129, 128);
      };
      var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.pointerlockChangeEvent ||= _malloc(257);
        var pointerlockChangeEventHandlerFunc = (e = event) => {
          var pointerlockChangeEvent = targetThread ? _malloc(257) : JSEvents.pointerlockChangeEvent;
          fillPointerlockChangeEventData(pointerlockChangeEvent);
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, pointerlockChangeEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target,
          eventTypeString,
          callbackfunc,
          handlerFunc: pointerlockChangeEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_pointerlockchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(66, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        if (!document || !document.body || !document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock) {
          return -1;
        }
        target = findEventTarget(target);
        if (!target) return -4;
        registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
        registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
        registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
        return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
      }
      var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.uiEvent ||= _malloc(36);
        target = findEventTarget(target);
        var uiEventHandlerFunc = (e = event) => {
          if (e.target != target) {
            return;
          }
          var b = document.body;
          if (!b) {
            return;
          }
          var uiEvent = targetThread ? _malloc(36) : JSEvents.uiEvent;
          HEAP32[uiEvent >> 2] = 0;
          HEAP32[uiEvent + 4 >> 2] = b.clientWidth;
          HEAP32[uiEvent + 8 >> 2] = b.clientHeight;
          HEAP32[uiEvent + 12 >> 2] = innerWidth;
          HEAP32[uiEvent + 16 >> 2] = innerHeight;
          HEAP32[uiEvent + 20 >> 2] = outerWidth;
          HEAP32[uiEvent + 24 >> 2] = outerHeight;
          HEAP32[uiEvent + 28 >> 2] = pageXOffset | 0;
          HEAP32[uiEvent + 32 >> 2] = pageYOffset | 0;
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, uiEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target,
          eventTypeString,
          callbackfunc,
          handlerFunc: uiEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_resize_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(67, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);
      }
      var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.touchEvent ||= _malloc(1552);
        target = findEventTarget(target);
        var touchEventHandlerFunc = (e) => {
          var t, touches = {}, et = e.touches;
          for (let t2 of et) {
            t2.isChanged = t2.onTarget = 0;
            touches[t2.identifier] = t2;
          }
          for (let t2 of e.changedTouches) {
            t2.isChanged = 1;
            touches[t2.identifier] = t2;
          }
          for (let t2 of e.targetTouches) {
            touches[t2.identifier].onTarget = 1;
          }
          var touchEvent = targetThread ? _malloc(1552) : JSEvents.touchEvent;
          HEAPF64[touchEvent >> 3] = e.timeStamp;
          HEAP8[touchEvent + 12] = e.ctrlKey;
          HEAP8[touchEvent + 13] = e.shiftKey;
          HEAP8[touchEvent + 14] = e.altKey;
          HEAP8[touchEvent + 15] = e.metaKey;
          var idx = touchEvent + 16;
          var targetRect = getBoundingClientRect(target);
          var numTouches = 0;
          for (let t2 of Object.values(touches)) {
            var idx32 = idx >> 2;
            HEAP32[idx32 + 0] = t2.identifier;
            HEAP32[idx32 + 1] = t2.screenX;
            HEAP32[idx32 + 2] = t2.screenY;
            HEAP32[idx32 + 3] = t2.clientX;
            HEAP32[idx32 + 4] = t2.clientY;
            HEAP32[idx32 + 5] = t2.pageX;
            HEAP32[idx32 + 6] = t2.pageY;
            HEAP8[idx + 28] = t2.isChanged;
            HEAP8[idx + 29] = t2.onTarget;
            HEAP32[idx32 + 8] = t2.clientX - (targetRect.left | 0);
            HEAP32[idx32 + 9] = t2.clientY - (targetRect.top | 0);
            idx += 48;
            if (++numTouches > 31) {
              break;
            }
          }
          HEAP32[touchEvent + 8 >> 2] = numTouches;
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, touchEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target,
          allowsDeferredCalls: eventTypeString == "touchstart" || eventTypeString == "touchend",
          eventTypeString,
          callbackfunc,
          handlerFunc: touchEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_touchcancel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(68, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);
      }
      function _emscripten_set_touchend_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(69, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);
      }
      function _emscripten_set_touchmove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(70, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);
      }
      function _emscripten_set_touchstart_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(71, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);
      }
      var fillVisibilityChangeEventData = (eventStruct) => {
        var visibilityStates = ["hidden", "visible", "prerender", "unloaded"];
        var visibilityState = visibilityStates.indexOf(document.visibilityState);
        HEAP8[eventStruct] = document.hidden;
        HEAP32[eventStruct + 4 >> 2] = visibilityState;
      };
      var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.visibilityChangeEvent ||= _malloc(8);
        var visibilityChangeEventHandlerFunc = (e = event) => {
          var visibilityChangeEvent = targetThread ? _malloc(8) : JSEvents.visibilityChangeEvent;
          fillVisibilityChangeEventData(visibilityChangeEvent);
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, visibilityChangeEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target,
          eventTypeString,
          callbackfunc,
          handlerFunc: visibilityChangeEventHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_visibilitychange_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(72, 0, 1, userData, useCapture, callbackfunc, targetThread);
        if (!specialHTMLTargets[1]) {
          return -4;
        }
        return registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);
      }
      var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
        targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
        JSEvents.wheelEvent ||= _malloc(96);
        var wheelHandlerFunc = (e = event) => {
          var wheelEvent = targetThread ? _malloc(96) : JSEvents.wheelEvent;
          fillMouseEventData(wheelEvent, e, target);
          HEAPF64[wheelEvent + 64 >> 3] = e["deltaX"];
          HEAPF64[wheelEvent + 72 >> 3] = e["deltaY"];
          HEAPF64[wheelEvent + 80 >> 3] = e["deltaZ"];
          HEAP32[wheelEvent + 88 >> 2] = e["deltaMode"];
          if (targetThread) __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, wheelEvent, userData);
          else if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
        };
        var eventHandler = {
          target,
          allowsDeferredCalls: true,
          eventTypeString,
          callbackfunc,
          handlerFunc: wheelHandlerFunc,
          useCapture
        };
        return JSEvents.registerOrRemoveHandler(eventHandler);
      };
      function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(73, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
        target = findEventTarget(target);
        if (!target) return -4;
        if (typeof target.onwheel != "undefined") {
          return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
        } else {
          return -1;
        }
      }
      function _emscripten_set_window_title(title) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(74, 0, 1, title);
        return document.title = UTF8ToString(title);
      }
      var _emscripten_sleep = () => {
        throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep";
      };
      var ENV = {};
      var getExecutableName = () => thisProgram || "./this.program";
      var getEnvStrings = () => {
        if (!getEnvStrings.strings) {
          var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
          var env = {
            "USER": "web_user",
            "LOGNAME": "web_user",
            "PATH": "/",
            "PWD": "/",
            "HOME": "/home/web_user",
            "LANG": lang,
            "_": getExecutableName()
          };
          for (var x in ENV) {
            if (ENV[x] === void 0) delete env[x];
            else env[x] = ENV[x];
          }
          var strings = [];
          for (var x in env) {
            strings.push(`${x}=${env[x]}`);
          }
          getEnvStrings.strings = strings;
        }
        return getEnvStrings.strings;
      };
      var stringToAscii = (str, buffer) => {
        for (var i2 = 0; i2 < str.length; ++i2) {
          HEAP8[buffer++] = str.charCodeAt(i2);
        }
        HEAP8[buffer] = 0;
      };
      var _environ_get = function(__environ, environ_buf) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(75, 0, 1, __environ, environ_buf);
        var bufSize = 0;
        getEnvStrings().forEach((string, i2) => {
          var ptr = environ_buf + bufSize;
          HEAPU32[__environ + i2 * 4 >> 2] = ptr;
          stringToAscii(string, ptr);
          bufSize += string.length + 1;
        });
        return 0;
      };
      var _environ_sizes_get = function(penviron_count, penviron_buf_size) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(76, 0, 1, penviron_count, penviron_buf_size);
        var strings = getEnvStrings();
        HEAPU32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach((string) => bufSize += string.length + 1);
        HEAPU32[penviron_buf_size >> 2] = bufSize;
        return 0;
      };
      function _fd_close(fd) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(77, 0, 1, fd);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.close(stream);
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return e.errno;
        }
      }
      var doReadv = (stream, iov, iovcnt, offset) => {
        var ret = 0;
        for (var i2 = 0; i2 < iovcnt; i2++) {
          var ptr = HEAPU32[iov >> 2];
          var len = HEAPU32[iov + 4 >> 2];
          iov += 8;
          var curr = FS.read(stream, HEAP8, ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break;
          if (typeof offset != "undefined") {
            offset += curr;
          }
        }
        return ret;
      };
      function _fd_read(fd, iov, iovcnt, pnum) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(78, 0, 1, fd, iov, iovcnt, pnum);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = doReadv(stream, iov, iovcnt);
          HEAPU32[pnum >> 2] = num;
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return e.errno;
        }
      }
      function _fd_seek(fd, offset, whence, newOffset) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(79, 0, 1, fd, offset, whence, newOffset);
        offset = bigintToI53Checked(offset);
        try {
          if (isNaN(offset)) return 61;
          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.llseek(stream, offset, whence);
          HEAP64[newOffset >> 3] = BigInt(stream.position);
          if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return e.errno;
        }
        ;
      }
      function _fd_sync(fd) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(80, 0, 1, fd);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          if (stream.stream_ops?.fsync) {
            return stream.stream_ops.fsync(stream);
          }
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return e.errno;
        }
      }
      var doWritev = (stream, iov, iovcnt, offset) => {
        var ret = 0;
        for (var i2 = 0; i2 < iovcnt; i2++) {
          var ptr = HEAPU32[iov >> 2];
          var len = HEAPU32[iov + 4 >> 2];
          iov += 8;
          var curr = FS.write(stream, HEAP8, ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) {
            break;
          }
          if (typeof offset != "undefined") {
            offset += curr;
          }
        }
        return ret;
      };
      function _fd_write(fd, iov, iovcnt, pnum) {
        if (ENVIRONMENT_IS_PTHREAD)
          return proxyToMainThread(81, 0, 1, fd, iov, iovcnt, pnum);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = doWritev(stream, iov, iovcnt);
          HEAPU32[pnum >> 2] = num;
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
          return e.errno;
        }
      }
      var listenOnce = (object, event2, func) => object.addEventListener(event2, func, { "once": true });
      var autoResumeAudioContext = (ctx, elements) => {
        if (!elements) {
          elements = [document, document.getElementById("canvas")];
        }
        ["keydown", "mousedown", "touchstart"].forEach((event2) => {
          elements.forEach((element) => {
            if (element) {
              listenOnce(element, event2, () => {
                if (ctx.state === "suspended") ctx.resume();
              });
            }
          });
        });
      };
      var dynCall = (sig, ptr, args = []) => {
        var rtn = getWasmTableEntry(ptr)(...args);
        return rtn;
      };
      var getCFunc = (ident) => {
        var func = Module["_" + ident];
        return func;
      };
      var writeArrayToMemory = (array, buffer) => {
        HEAP8.set(array, buffer);
      };
      var ccall = (ident, returnType, argTypes, args, opts) => {
        var toC = {
          "string": (str) => {
            var ret2 = 0;
            if (str !== null && str !== void 0 && str !== 0) {
              ret2 = stringToUTF8OnStack(str);
            }
            return ret2;
          },
          "array": (arr) => {
            var ret2 = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret2);
            return ret2;
          }
        };
        function convertReturnValue(ret2) {
          if (returnType === "string") {
            return UTF8ToString(ret2);
          }
          if (returnType === "boolean") return Boolean(ret2);
          return ret2;
        }
        var func = getCFunc(ident);
        var cArgs = [];
        var stack = 0;
        if (args) {
          for (var i2 = 0; i2 < args.length; i2++) {
            var converter = toC[argTypes[i2]];
            if (converter) {
              if (stack === 0) stack = stackSave();
              cArgs[i2] = converter(args[i2]);
            } else {
              cArgs[i2] = args[i2];
            }
          }
        }
        var ret = func(...cArgs);
        function onDone(ret2) {
          if (stack !== 0) stackRestore(stack);
          return convertReturnValue(ret2);
        }
        ret = onDone(ret);
        return ret;
      };
      var cwrap = (ident, returnType, argTypes, opts) => {
        var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
        var numericRet = returnType !== "string";
        if (numericRet && numericArgs && !opts) {
          return getCFunc(ident);
        }
        return (...args) => ccall(ident, returnType, argTypes, args, opts);
      };
      var uleb128Encode = (n, target) => {
        if (n < 128) {
          target.push(n);
        } else {
          target.push(n % 128 | 128, n >> 7);
        }
      };
      var sigToWasmTypes = (sig) => {
        var typeNames = {
          "i": "i32",
          "j": "i64",
          "f": "f32",
          "d": "f64",
          "e": "externref",
          "p": "i32"
        };
        var type = {
          parameters: [],
          results: sig[0] == "v" ? [] : [typeNames[sig[0]]]
        };
        for (var i2 = 1; i2 < sig.length; ++i2) {
          type.parameters.push(typeNames[sig[i2]]);
        }
        return type;
      };
      var generateFuncType = (sig, target) => {
        var sigRet = sig.slice(0, 1);
        var sigParam = sig.slice(1);
        var typeCodes = {
          "i": 127,
          // i32
          "p": 127,
          // i32
          "j": 126,
          // i64
          "f": 125,
          // f32
          "d": 124,
          // f64
          "e": 111
          // externref
        };
        target.push(
          96
          /* form: func */
        );
        uleb128Encode(sigParam.length, target);
        for (var i2 = 0; i2 < sigParam.length; ++i2) {
          target.push(typeCodes[sigParam[i2]]);
        }
        if (sigRet == "v") {
          target.push(0);
        } else {
          target.push(1, typeCodes[sigRet]);
        }
      };
      var convertJsFunctionToWasm = (func, sig) => {
        if (typeof WebAssembly.Function == "function") {
          return new WebAssembly.Function(sigToWasmTypes(sig), func);
        }
        var typeSectionBody = [
          1
          // count: 1
        ];
        generateFuncType(sig, typeSectionBody);
        var bytes = [
          0,
          97,
          115,
          109,
          // magic ("\0asm")
          1,
          0,
          0,
          0,
          // version: 1
          1
          // Type section code
        ];
        uleb128Encode(typeSectionBody.length, bytes);
        bytes.push(...typeSectionBody);
        bytes.push(
          2,
          7,
          // import section
          // (import "e" "f" (func 0 (type 0)))
          1,
          1,
          101,
          1,
          102,
          0,
          0,
          7,
          5,
          // export section
          // (export "f" (func 0 (type 0)))
          1,
          1,
          102,
          0,
          0
        );
        var module = new WebAssembly.Module(new Uint8Array(bytes));
        var instance = new WebAssembly.Instance(module, { "e": { "f": func } });
        var wrappedFunc = instance.exports["f"];
        return wrappedFunc;
      };
      var updateTableMap = (offset, count) => {
        if (functionsInTableMap) {
          for (var i2 = offset; i2 < offset + count; i2++) {
            var item = getWasmTableEntry(i2);
            if (item) {
              functionsInTableMap.set(item, i2);
            }
          }
        }
      };
      var functionsInTableMap;
      var getFunctionAddress = (func) => {
        if (!functionsInTableMap) {
          functionsInTableMap = /* @__PURE__ */ new WeakMap();
          updateTableMap(0, wasmTable.length);
        }
        return functionsInTableMap.get(func) || 0;
      };
      var freeTableIndexes = [];
      var getEmptyTableSlot = () => {
        if (freeTableIndexes.length) {
          return freeTableIndexes.pop();
        }
        try {
          wasmTable.grow(1);
        } catch (err2) {
          if (!(err2 instanceof RangeError)) {
            throw err2;
          }
          throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
        }
        return wasmTable.length - 1;
      };
      var setWasmTableEntry = (idx, func) => {
        wasmTable.set(idx, func);
        wasmTableMirror[idx] = wasmTable.get(idx);
      };
      var addFunction = (func, sig) => {
        var rtn = getFunctionAddress(func);
        if (rtn) {
          return rtn;
        }
        var ret = getEmptyTableSlot();
        try {
          setWasmTableEntry(ret, func);
        } catch (err2) {
          if (!(err2 instanceof TypeError)) {
            throw err2;
          }
          var wrapped = convertJsFunctionToWasm(func, sig);
          setWasmTableEntry(ret, wrapped);
        }
        functionsInTableMap.set(func, ret);
        return ret;
      };
      var removeFunction = (index) => {
        functionsInTableMap.delete(getWasmTableEntry(index));
        setWasmTableEntry(index, null);
        freeTableIndexes.push(index);
      };
      PThread.init();
      ;
      FS.createPreloadedFile = FS_createPreloadedFile;
      FS.staticInit();
      ;
      MEMFS.doesNotExistError = new FS.ErrnoError(44);
      MEMFS.doesNotExistError.stack = "<generic error, no stack>";
      ;
      Module["requestFullscreen"] = Browser.requestFullscreen;
      Module["setCanvasSize"] = Browser.setCanvasSize;
      Module["getUserMedia"] = Browser.getUserMedia;
      Module["createContext"] = Browser.createContext;
      ;
      Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
      Module["pauseMainLoop"] = MainLoop.pause;
      Module["resumeMainLoop"] = MainLoop.resume;
      MainLoop.init();
      ;
      for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));
      ;
      var proxiedFunctionTable = [
        _proc_exit,
        exitOnMainThread,
        pthreadCreateProxied,
        ___syscall_fcntl64,
        ___syscall_fstat64,
        ___syscall_ftruncate64,
        ___syscall_getcwd,
        ___syscall_getdents64,
        ___syscall_ioctl,
        ___syscall_lstat64,
        ___syscall_mkdirat,
        ___syscall_newfstatat,
        ___syscall_openat,
        ___syscall_readlinkat,
        ___syscall_rmdir,
        ___syscall_stat64,
        ___syscall_unlinkat,
        ___syscall_utimensat,
        __mmap_js,
        __msync_js,
        __munmap_js,
        _eglBindAPI,
        _eglChooseConfig,
        _eglCreateContext,
        _eglCreateWindowSurface,
        _eglDestroyContext,
        _eglDestroySurface,
        _eglGetConfigAttrib,
        _eglGetDisplay,
        _eglGetError,
        _eglInitialize,
        _eglMakeCurrent,
        _eglQueryString,
        _eglSwapBuffers,
        _eglSwapInterval,
        _eglTerminate,
        _eglWaitClient,
        _eglWaitNative,
        _emscripten_exit_fullscreen,
        getCanvasSizeMainThread,
        setCanvasElementSizeMainThread,
        _emscripten_exit_pointerlock,
        _emscripten_force_exit,
        _emscripten_get_device_pixel_ratio,
        _emscripten_get_element_css_size,
        _emscripten_get_gamepad_status,
        _emscripten_get_num_gamepads,
        _emscripten_get_screen_size,
        _emscripten_request_fullscreen_strategy,
        _emscripten_request_pointerlock,
        _emscripten_sample_gamepad_data,
        _emscripten_set_beforeunload_callback_on_thread,
        _emscripten_set_blur_callback_on_thread,
        _emscripten_set_element_css_size,
        _emscripten_set_focus_callback_on_thread,
        _emscripten_set_fullscreenchange_callback_on_thread,
        _emscripten_set_gamepadconnected_callback_on_thread,
        _emscripten_set_gamepaddisconnected_callback_on_thread,
        _emscripten_set_keydown_callback_on_thread,
        _emscripten_set_keypress_callback_on_thread,
        _emscripten_set_keyup_callback_on_thread,
        _emscripten_set_mousedown_callback_on_thread,
        _emscripten_set_mouseenter_callback_on_thread,
        _emscripten_set_mouseleave_callback_on_thread,
        _emscripten_set_mousemove_callback_on_thread,
        _emscripten_set_mouseup_callback_on_thread,
        _emscripten_set_pointerlockchange_callback_on_thread,
        _emscripten_set_resize_callback_on_thread,
        _emscripten_set_touchcancel_callback_on_thread,
        _emscripten_set_touchend_callback_on_thread,
        _emscripten_set_touchmove_callback_on_thread,
        _emscripten_set_touchstart_callback_on_thread,
        _emscripten_set_visibilitychange_callback_on_thread,
        _emscripten_set_wheel_callback_on_thread,
        _emscripten_set_window_title,
        _environ_get,
        _environ_sizes_get,
        _fd_close,
        _fd_read,
        _fd_seek,
        _fd_sync,
        _fd_write
      ];
      var wasmImports;
      function assignWasmImports() {
        wasmImports = {
          /** @export */
          __assert_fail: ___assert_fail,
          /** @export */
          __call_sighandler: ___call_sighandler,
          /** @export */
          __pthread_create_js: ___pthread_create_js,
          /** @export */
          __syscall_fcntl64: ___syscall_fcntl64,
          /** @export */
          __syscall_fstat64: ___syscall_fstat64,
          /** @export */
          __syscall_ftruncate64: ___syscall_ftruncate64,
          /** @export */
          __syscall_getcwd: ___syscall_getcwd,
          /** @export */
          __syscall_getdents64: ___syscall_getdents64,
          /** @export */
          __syscall_ioctl: ___syscall_ioctl,
          /** @export */
          __syscall_lstat64: ___syscall_lstat64,
          /** @export */
          __syscall_mkdirat: ___syscall_mkdirat,
          /** @export */
          __syscall_newfstatat: ___syscall_newfstatat,
          /** @export */
          __syscall_openat: ___syscall_openat,
          /** @export */
          __syscall_readlinkat: ___syscall_readlinkat,
          /** @export */
          __syscall_rmdir: ___syscall_rmdir,
          /** @export */
          __syscall_stat64: ___syscall_stat64,
          /** @export */
          __syscall_unlinkat: ___syscall_unlinkat,
          /** @export */
          __syscall_utimensat: ___syscall_utimensat,
          /** @export */
          _abort_js: __abort_js,
          /** @export */
          _emscripten_init_main_thread_js: __emscripten_init_main_thread_js,
          /** @export */
          _emscripten_notify_mailbox_postmessage: __emscripten_notify_mailbox_postmessage,
          /** @export */
          _emscripten_receive_on_main_thread_js: __emscripten_receive_on_main_thread_js,
          /** @export */
          _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
          /** @export */
          _emscripten_thread_cleanup: __emscripten_thread_cleanup,
          /** @export */
          _emscripten_thread_mailbox_await: __emscripten_thread_mailbox_await,
          /** @export */
          _emscripten_thread_set_strongref: __emscripten_thread_set_strongref,
          /** @export */
          _emscripten_throw_longjmp: __emscripten_throw_longjmp,
          /** @export */
          _localtime_js: __localtime_js,
          /** @export */
          _mktime_js: __mktime_js,
          /** @export */
          _mmap_js: __mmap_js,
          /** @export */
          _msync_js: __msync_js,
          /** @export */
          _munmap_js: __munmap_js,
          /** @export */
          _tzset_js: __tzset_js,
          /** @export */
          clock_time_get: _clock_time_get,
          /** @export */
          eglBindAPI: _eglBindAPI,
          /** @export */
          eglChooseConfig: _eglChooseConfig,
          /** @export */
          eglCreateContext: _eglCreateContext,
          /** @export */
          eglCreateWindowSurface: _eglCreateWindowSurface,
          /** @export */
          eglDestroyContext: _eglDestroyContext,
          /** @export */
          eglDestroySurface: _eglDestroySurface,
          /** @export */
          eglGetConfigAttrib: _eglGetConfigAttrib,
          /** @export */
          eglGetDisplay: _eglGetDisplay,
          /** @export */
          eglGetError: _eglGetError,
          /** @export */
          eglInitialize: _eglInitialize,
          /** @export */
          eglMakeCurrent: _eglMakeCurrent,
          /** @export */
          eglQueryString: _eglQueryString,
          /** @export */
          eglSwapBuffers: _eglSwapBuffers,
          /** @export */
          eglSwapInterval: _eglSwapInterval,
          /** @export */
          eglTerminate: _eglTerminate,
          /** @export */
          eglWaitGL: _eglWaitGL,
          /** @export */
          eglWaitNative: _eglWaitNative,
          /** @export */
          emscripten_asm_const_int: _emscripten_asm_const_int,
          /** @export */
          emscripten_asm_const_int_sync_on_main_thread: _emscripten_asm_const_int_sync_on_main_thread,
          /** @export */
          emscripten_asm_const_ptr_sync_on_main_thread: _emscripten_asm_const_ptr_sync_on_main_thread,
          /** @export */
          emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
          /** @export */
          emscripten_check_blocking_allowed: _emscripten_check_blocking_allowed,
          /** @export */
          emscripten_date_now: _emscripten_date_now,
          /** @export */
          emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
          /** @export */
          emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
          /** @export */
          emscripten_exit_with_live_runtime: _emscripten_exit_with_live_runtime,
          /** @export */
          emscripten_force_exit: _emscripten_force_exit,
          /** @export */
          emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
          /** @export */
          emscripten_get_element_css_size: _emscripten_get_element_css_size,
          /** @export */
          emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
          /** @export */
          emscripten_get_main_loop_timing: _emscripten_get_main_loop_timing,
          /** @export */
          emscripten_get_now: _emscripten_get_now,
          /** @export */
          emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
          /** @export */
          emscripten_get_screen_size: _emscripten_get_screen_size,
          /** @export */
          emscripten_glActiveTexture: _emscripten_glActiveTexture,
          /** @export */
          emscripten_glAttachShader: _emscripten_glAttachShader,
          /** @export */
          emscripten_glBeginQuery: _emscripten_glBeginQuery,
          /** @export */
          emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
          /** @export */
          emscripten_glBeginTransformFeedback: _emscripten_glBeginTransformFeedback,
          /** @export */
          emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
          /** @export */
          emscripten_glBindBuffer: _emscripten_glBindBuffer,
          /** @export */
          emscripten_glBindBufferBase: _emscripten_glBindBufferBase,
          /** @export */
          emscripten_glBindBufferRange: _emscripten_glBindBufferRange,
          /** @export */
          emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
          /** @export */
          emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
          /** @export */
          emscripten_glBindSampler: _emscripten_glBindSampler,
          /** @export */
          emscripten_glBindTexture: _emscripten_glBindTexture,
          /** @export */
          emscripten_glBindTransformFeedback: _emscripten_glBindTransformFeedback,
          /** @export */
          emscripten_glBindVertexArray: _emscripten_glBindVertexArray,
          /** @export */
          emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
          /** @export */
          emscripten_glBlendColor: _emscripten_glBlendColor,
          /** @export */
          emscripten_glBlendEquation: _emscripten_glBlendEquation,
          /** @export */
          emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
          /** @export */
          emscripten_glBlendFunc: _emscripten_glBlendFunc,
          /** @export */
          emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
          /** @export */
          emscripten_glBlitFramebuffer: _emscripten_glBlitFramebuffer,
          /** @export */
          emscripten_glBufferData: _emscripten_glBufferData,
          /** @export */
          emscripten_glBufferSubData: _emscripten_glBufferSubData,
          /** @export */
          emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
          /** @export */
          emscripten_glClear: _emscripten_glClear,
          /** @export */
          emscripten_glClearBufferfi: _emscripten_glClearBufferfi,
          /** @export */
          emscripten_glClearBufferfv: _emscripten_glClearBufferfv,
          /** @export */
          emscripten_glClearBufferiv: _emscripten_glClearBufferiv,
          /** @export */
          emscripten_glClearBufferuiv: _emscripten_glClearBufferuiv,
          /** @export */
          emscripten_glClearColor: _emscripten_glClearColor,
          /** @export */
          emscripten_glClearDepthf: _emscripten_glClearDepthf,
          /** @export */
          emscripten_glClearStencil: _emscripten_glClearStencil,
          /** @export */
          emscripten_glClientWaitSync: _emscripten_glClientWaitSync,
          /** @export */
          emscripten_glClipControlEXT: _emscripten_glClipControlEXT,
          /** @export */
          emscripten_glColorMask: _emscripten_glColorMask,
          /** @export */
          emscripten_glCompileShader: _emscripten_glCompileShader,
          /** @export */
          emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
          /** @export */
          emscripten_glCompressedTexImage3D: _emscripten_glCompressedTexImage3D,
          /** @export */
          emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
          /** @export */
          emscripten_glCompressedTexSubImage3D: _emscripten_glCompressedTexSubImage3D,
          /** @export */
          emscripten_glCopyBufferSubData: _emscripten_glCopyBufferSubData,
          /** @export */
          emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
          /** @export */
          emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
          /** @export */
          emscripten_glCopyTexSubImage3D: _emscripten_glCopyTexSubImage3D,
          /** @export */
          emscripten_glCreateProgram: _emscripten_glCreateProgram,
          /** @export */
          emscripten_glCreateShader: _emscripten_glCreateShader,
          /** @export */
          emscripten_glCullFace: _emscripten_glCullFace,
          /** @export */
          emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
          /** @export */
          emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
          /** @export */
          emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
          /** @export */
          emscripten_glDeleteQueries: _emscripten_glDeleteQueries,
          /** @export */
          emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
          /** @export */
          emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
          /** @export */
          emscripten_glDeleteSamplers: _emscripten_glDeleteSamplers,
          /** @export */
          emscripten_glDeleteShader: _emscripten_glDeleteShader,
          /** @export */
          emscripten_glDeleteSync: _emscripten_glDeleteSync,
          /** @export */
          emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
          /** @export */
          emscripten_glDeleteTransformFeedbacks: _emscripten_glDeleteTransformFeedbacks,
          /** @export */
          emscripten_glDeleteVertexArrays: _emscripten_glDeleteVertexArrays,
          /** @export */
          emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
          /** @export */
          emscripten_glDepthFunc: _emscripten_glDepthFunc,
          /** @export */
          emscripten_glDepthMask: _emscripten_glDepthMask,
          /** @export */
          emscripten_glDepthRangef: _emscripten_glDepthRangef,
          /** @export */
          emscripten_glDetachShader: _emscripten_glDetachShader,
          /** @export */
          emscripten_glDisable: _emscripten_glDisable,
          /** @export */
          emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
          /** @export */
          emscripten_glDrawArrays: _emscripten_glDrawArrays,
          /** @export */
          emscripten_glDrawArraysInstanced: _emscripten_glDrawArraysInstanced,
          /** @export */
          emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
          /** @export */
          emscripten_glDrawArraysInstancedARB: _emscripten_glDrawArraysInstancedARB,
          /** @export */
          emscripten_glDrawArraysInstancedEXT: _emscripten_glDrawArraysInstancedEXT,
          /** @export */
          emscripten_glDrawArraysInstancedNV: _emscripten_glDrawArraysInstancedNV,
          /** @export */
          emscripten_glDrawBuffers: _emscripten_glDrawBuffers,
          /** @export */
          emscripten_glDrawBuffersEXT: _emscripten_glDrawBuffersEXT,
          /** @export */
          emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
          /** @export */
          emscripten_glDrawElements: _emscripten_glDrawElements,
          /** @export */
          emscripten_glDrawElementsInstanced: _emscripten_glDrawElementsInstanced,
          /** @export */
          emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
          /** @export */
          emscripten_glDrawElementsInstancedARB: _emscripten_glDrawElementsInstancedARB,
          /** @export */
          emscripten_glDrawElementsInstancedEXT: _emscripten_glDrawElementsInstancedEXT,
          /** @export */
          emscripten_glDrawElementsInstancedNV: _emscripten_glDrawElementsInstancedNV,
          /** @export */
          emscripten_glDrawRangeElements: _emscripten_glDrawRangeElements,
          /** @export */
          emscripten_glEnable: _emscripten_glEnable,
          /** @export */
          emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
          /** @export */
          emscripten_glEndQuery: _emscripten_glEndQuery,
          /** @export */
          emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
          /** @export */
          emscripten_glEndTransformFeedback: _emscripten_glEndTransformFeedback,
          /** @export */
          emscripten_glFenceSync: _emscripten_glFenceSync,
          /** @export */
          emscripten_glFinish: _emscripten_glFinish,
          /** @export */
          emscripten_glFlush: _emscripten_glFlush,
          /** @export */
          emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
          /** @export */
          emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
          /** @export */
          emscripten_glFramebufferTextureLayer: _emscripten_glFramebufferTextureLayer,
          /** @export */
          emscripten_glFrontFace: _emscripten_glFrontFace,
          /** @export */
          emscripten_glGenBuffers: _emscripten_glGenBuffers,
          /** @export */
          emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
          /** @export */
          emscripten_glGenQueries: _emscripten_glGenQueries,
          /** @export */
          emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
          /** @export */
          emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
          /** @export */
          emscripten_glGenSamplers: _emscripten_glGenSamplers,
          /** @export */
          emscripten_glGenTextures: _emscripten_glGenTextures,
          /** @export */
          emscripten_glGenTransformFeedbacks: _emscripten_glGenTransformFeedbacks,
          /** @export */
          emscripten_glGenVertexArrays: _emscripten_glGenVertexArrays,
          /** @export */
          emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
          /** @export */
          emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
          /** @export */
          emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
          /** @export */
          emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
          /** @export */
          emscripten_glGetActiveUniformBlockName: _emscripten_glGetActiveUniformBlockName,
          /** @export */
          emscripten_glGetActiveUniformBlockiv: _emscripten_glGetActiveUniformBlockiv,
          /** @export */
          emscripten_glGetActiveUniformsiv: _emscripten_glGetActiveUniformsiv,
          /** @export */
          emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
          /** @export */
          emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
          /** @export */
          emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
          /** @export */
          emscripten_glGetBufferParameteri64v: _emscripten_glGetBufferParameteri64v,
          /** @export */
          emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
          /** @export */
          emscripten_glGetError: _emscripten_glGetError,
          /** @export */
          emscripten_glGetFloatv: _emscripten_glGetFloatv,
          /** @export */
          emscripten_glGetFragDataLocation: _emscripten_glGetFragDataLocation,
          /** @export */
          emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
          /** @export */
          emscripten_glGetInteger64i_v: _emscripten_glGetInteger64i_v,
          /** @export */
          emscripten_glGetInteger64v: _emscripten_glGetInteger64v,
          /** @export */
          emscripten_glGetIntegeri_v: _emscripten_glGetIntegeri_v,
          /** @export */
          emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
          /** @export */
          emscripten_glGetInternalformativ: _emscripten_glGetInternalformativ,
          /** @export */
          emscripten_glGetProgramBinary: _emscripten_glGetProgramBinary,
          /** @export */
          emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
          /** @export */
          emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
          /** @export */
          emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
          /** @export */
          emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
          /** @export */
          emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
          /** @export */
          emscripten_glGetQueryObjectuiv: _emscripten_glGetQueryObjectuiv,
          /** @export */
          emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
          /** @export */
          emscripten_glGetQueryiv: _emscripten_glGetQueryiv,
          /** @export */
          emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
          /** @export */
          emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
          /** @export */
          emscripten_glGetSamplerParameterfv: _emscripten_glGetSamplerParameterfv,
          /** @export */
          emscripten_glGetSamplerParameteriv: _emscripten_glGetSamplerParameteriv,
          /** @export */
          emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
          /** @export */
          emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
          /** @export */
          emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
          /** @export */
          emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
          /** @export */
          emscripten_glGetString: _emscripten_glGetString,
          /** @export */
          emscripten_glGetStringi: _emscripten_glGetStringi,
          /** @export */
          emscripten_glGetSynciv: _emscripten_glGetSynciv,
          /** @export */
          emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
          /** @export */
          emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
          /** @export */
          emscripten_glGetTransformFeedbackVarying: _emscripten_glGetTransformFeedbackVarying,
          /** @export */
          emscripten_glGetUniformBlockIndex: _emscripten_glGetUniformBlockIndex,
          /** @export */
          emscripten_glGetUniformIndices: _emscripten_glGetUniformIndices,
          /** @export */
          emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
          /** @export */
          emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
          /** @export */
          emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
          /** @export */
          emscripten_glGetUniformuiv: _emscripten_glGetUniformuiv,
          /** @export */
          emscripten_glGetVertexAttribIiv: _emscripten_glGetVertexAttribIiv,
          /** @export */
          emscripten_glGetVertexAttribIuiv: _emscripten_glGetVertexAttribIuiv,
          /** @export */
          emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
          /** @export */
          emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
          /** @export */
          emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
          /** @export */
          emscripten_glHint: _emscripten_glHint,
          /** @export */
          emscripten_glInvalidateFramebuffer: _emscripten_glInvalidateFramebuffer,
          /** @export */
          emscripten_glInvalidateSubFramebuffer: _emscripten_glInvalidateSubFramebuffer,
          /** @export */
          emscripten_glIsBuffer: _emscripten_glIsBuffer,
          /** @export */
          emscripten_glIsEnabled: _emscripten_glIsEnabled,
          /** @export */
          emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
          /** @export */
          emscripten_glIsProgram: _emscripten_glIsProgram,
          /** @export */
          emscripten_glIsQuery: _emscripten_glIsQuery,
          /** @export */
          emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
          /** @export */
          emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
          /** @export */
          emscripten_glIsSampler: _emscripten_glIsSampler,
          /** @export */
          emscripten_glIsShader: _emscripten_glIsShader,
          /** @export */
          emscripten_glIsSync: _emscripten_glIsSync,
          /** @export */
          emscripten_glIsTexture: _emscripten_glIsTexture,
          /** @export */
          emscripten_glIsTransformFeedback: _emscripten_glIsTransformFeedback,
          /** @export */
          emscripten_glIsVertexArray: _emscripten_glIsVertexArray,
          /** @export */
          emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
          /** @export */
          emscripten_glLineWidth: _emscripten_glLineWidth,
          /** @export */
          emscripten_glLinkProgram: _emscripten_glLinkProgram,
          /** @export */
          emscripten_glPauseTransformFeedback: _emscripten_glPauseTransformFeedback,
          /** @export */
          emscripten_glPixelStorei: _emscripten_glPixelStorei,
          /** @export */
          emscripten_glPolygonModeWEBGL: _emscripten_glPolygonModeWEBGL,
          /** @export */
          emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
          /** @export */
          emscripten_glPolygonOffsetClampEXT: _emscripten_glPolygonOffsetClampEXT,
          /** @export */
          emscripten_glProgramBinary: _emscripten_glProgramBinary,
          /** @export */
          emscripten_glProgramParameteri: _emscripten_glProgramParameteri,
          /** @export */
          emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
          /** @export */
          emscripten_glReadBuffer: _emscripten_glReadBuffer,
          /** @export */
          emscripten_glReadPixels: _emscripten_glReadPixels,
          /** @export */
          emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
          /** @export */
          emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
          /** @export */
          emscripten_glRenderbufferStorageMultisample: _emscripten_glRenderbufferStorageMultisample,
          /** @export */
          emscripten_glResumeTransformFeedback: _emscripten_glResumeTransformFeedback,
          /** @export */
          emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
          /** @export */
          emscripten_glSamplerParameterf: _emscripten_glSamplerParameterf,
          /** @export */
          emscripten_glSamplerParameterfv: _emscripten_glSamplerParameterfv,
          /** @export */
          emscripten_glSamplerParameteri: _emscripten_glSamplerParameteri,
          /** @export */
          emscripten_glSamplerParameteriv: _emscripten_glSamplerParameteriv,
          /** @export */
          emscripten_glScissor: _emscripten_glScissor,
          /** @export */
          emscripten_glShaderBinary: _emscripten_glShaderBinary,
          /** @export */
          emscripten_glShaderSource: _emscripten_glShaderSource,
          /** @export */
          emscripten_glStencilFunc: _emscripten_glStencilFunc,
          /** @export */
          emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
          /** @export */
          emscripten_glStencilMask: _emscripten_glStencilMask,
          /** @export */
          emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
          /** @export */
          emscripten_glStencilOp: _emscripten_glStencilOp,
          /** @export */
          emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
          /** @export */
          emscripten_glTexImage2D: _emscripten_glTexImage2D,
          /** @export */
          emscripten_glTexImage3D: _emscripten_glTexImage3D,
          /** @export */
          emscripten_glTexParameterf: _emscripten_glTexParameterf,
          /** @export */
          emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
          /** @export */
          emscripten_glTexParameteri: _emscripten_glTexParameteri,
          /** @export */
          emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
          /** @export */
          emscripten_glTexStorage2D: _emscripten_glTexStorage2D,
          /** @export */
          emscripten_glTexStorage3D: _emscripten_glTexStorage3D,
          /** @export */
          emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
          /** @export */
          emscripten_glTexSubImage3D: _emscripten_glTexSubImage3D,
          /** @export */
          emscripten_glTransformFeedbackVaryings: _emscripten_glTransformFeedbackVaryings,
          /** @export */
          emscripten_glUniform1f: _emscripten_glUniform1f,
          /** @export */
          emscripten_glUniform1fv: _emscripten_glUniform1fv,
          /** @export */
          emscripten_glUniform1i: _emscripten_glUniform1i,
          /** @export */
          emscripten_glUniform1iv: _emscripten_glUniform1iv,
          /** @export */
          emscripten_glUniform1ui: _emscripten_glUniform1ui,
          /** @export */
          emscripten_glUniform1uiv: _emscripten_glUniform1uiv,
          /** @export */
          emscripten_glUniform2f: _emscripten_glUniform2f,
          /** @export */
          emscripten_glUniform2fv: _emscripten_glUniform2fv,
          /** @export */
          emscripten_glUniform2i: _emscripten_glUniform2i,
          /** @export */
          emscripten_glUniform2iv: _emscripten_glUniform2iv,
          /** @export */
          emscripten_glUniform2ui: _emscripten_glUniform2ui,
          /** @export */
          emscripten_glUniform2uiv: _emscripten_glUniform2uiv,
          /** @export */
          emscripten_glUniform3f: _emscripten_glUniform3f,
          /** @export */
          emscripten_glUniform3fv: _emscripten_glUniform3fv,
          /** @export */
          emscripten_glUniform3i: _emscripten_glUniform3i,
          /** @export */
          emscripten_glUniform3iv: _emscripten_glUniform3iv,
          /** @export */
          emscripten_glUniform3ui: _emscripten_glUniform3ui,
          /** @export */
          emscripten_glUniform3uiv: _emscripten_glUniform3uiv,
          /** @export */
          emscripten_glUniform4f: _emscripten_glUniform4f,
          /** @export */
          emscripten_glUniform4fv: _emscripten_glUniform4fv,
          /** @export */
          emscripten_glUniform4i: _emscripten_glUniform4i,
          /** @export */
          emscripten_glUniform4iv: _emscripten_glUniform4iv,
          /** @export */
          emscripten_glUniform4ui: _emscripten_glUniform4ui,
          /** @export */
          emscripten_glUniform4uiv: _emscripten_glUniform4uiv,
          /** @export */
          emscripten_glUniformBlockBinding: _emscripten_glUniformBlockBinding,
          /** @export */
          emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
          /** @export */
          emscripten_glUniformMatrix2x3fv: _emscripten_glUniformMatrix2x3fv,
          /** @export */
          emscripten_glUniformMatrix2x4fv: _emscripten_glUniformMatrix2x4fv,
          /** @export */
          emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
          /** @export */
          emscripten_glUniformMatrix3x2fv: _emscripten_glUniformMatrix3x2fv,
          /** @export */
          emscripten_glUniformMatrix3x4fv: _emscripten_glUniformMatrix3x4fv,
          /** @export */
          emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
          /** @export */
          emscripten_glUniformMatrix4x2fv: _emscripten_glUniformMatrix4x2fv,
          /** @export */
          emscripten_glUniformMatrix4x3fv: _emscripten_glUniformMatrix4x3fv,
          /** @export */
          emscripten_glUseProgram: _emscripten_glUseProgram,
          /** @export */
          emscripten_glValidateProgram: _emscripten_glValidateProgram,
          /** @export */
          emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
          /** @export */
          emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
          /** @export */
          emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
          /** @export */
          emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
          /** @export */
          emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
          /** @export */
          emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
          /** @export */
          emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
          /** @export */
          emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
          /** @export */
          emscripten_glVertexAttribDivisor: _emscripten_glVertexAttribDivisor,
          /** @export */
          emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
          /** @export */
          emscripten_glVertexAttribDivisorARB: _emscripten_glVertexAttribDivisorARB,
          /** @export */
          emscripten_glVertexAttribDivisorEXT: _emscripten_glVertexAttribDivisorEXT,
          /** @export */
          emscripten_glVertexAttribDivisorNV: _emscripten_glVertexAttribDivisorNV,
          /** @export */
          emscripten_glVertexAttribI4i: _emscripten_glVertexAttribI4i,
          /** @export */
          emscripten_glVertexAttribI4iv: _emscripten_glVertexAttribI4iv,
          /** @export */
          emscripten_glVertexAttribI4ui: _emscripten_glVertexAttribI4ui,
          /** @export */
          emscripten_glVertexAttribI4uiv: _emscripten_glVertexAttribI4uiv,
          /** @export */
          emscripten_glVertexAttribIPointer: _emscripten_glVertexAttribIPointer,
          /** @export */
          emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
          /** @export */
          emscripten_glViewport: _emscripten_glViewport,
          /** @export */
          emscripten_glWaitSync: _emscripten_glWaitSync,
          /** @export */
          emscripten_has_asyncify: _emscripten_has_asyncify,
          /** @export */
          emscripten_pause_main_loop: _emscripten_pause_main_loop,
          /** @export */
          emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
          /** @export */
          emscripten_request_pointerlock: _emscripten_request_pointerlock,
          /** @export */
          emscripten_resize_heap: _emscripten_resize_heap,
          /** @export */
          emscripten_resume_main_loop: _emscripten_resume_main_loop,
          /** @export */
          emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
          /** @export */
          emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
          /** @export */
          emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
          /** @export */
          emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
          /** @export */
          emscripten_set_element_css_size: _emscripten_set_element_css_size,
          /** @export */
          emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
          /** @export */
          emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
          /** @export */
          emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
          /** @export */
          emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
          /** @export */
          emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
          /** @export */
          emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
          /** @export */
          emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
          /** @export */
          emscripten_set_main_loop: _emscripten_set_main_loop,
          /** @export */
          emscripten_set_main_loop_timing: _emscripten_set_main_loop_timing,
          /** @export */
          emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
          /** @export */
          emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
          /** @export */
          emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
          /** @export */
          emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
          /** @export */
          emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
          /** @export */
          emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
          /** @export */
          emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
          /** @export */
          emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
          /** @export */
          emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
          /** @export */
          emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
          /** @export */
          emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
          /** @export */
          emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
          /** @export */
          emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
          /** @export */
          emscripten_set_window_title: _emscripten_set_window_title,
          /** @export */
          emscripten_sleep: _emscripten_sleep,
          /** @export */
          environ_get: _environ_get,
          /** @export */
          environ_sizes_get: _environ_sizes_get,
          /** @export */
          exit: _exit,
          /** @export */
          fd_close: _fd_close,
          /** @export */
          fd_read: _fd_read,
          /** @export */
          fd_seek: _fd_seek,
          /** @export */
          fd_sync: _fd_sync,
          /** @export */
          fd_write: _fd_write,
          /** @export */
          invoke_ii,
          /** @export */
          invoke_iii,
          /** @export */
          invoke_iiii,
          /** @export */
          invoke_iiiii,
          /** @export */
          invoke_vi,
          /** @export */
          invoke_vii,
          /** @export */
          invoke_viii,
          /** @export */
          invoke_viiii,
          /** @export */
          invoke_viiiii,
          /** @export */
          invoke_viiiiiiiii,
          /** @export */
          memory: wasmMemory,
          /** @export */
          proc_exit: _proc_exit
        };
      }
      var wasmExports = await createWasm();
      var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports["__wasm_call_ctors"])();
      var _screenshot = Module["_screenshot"] = (a0) => (_screenshot = Module["_screenshot"] = wasmExports["screenshot"])(a0);
      var _buttonPress = Module["_buttonPress"] = (a0) => (_buttonPress = Module["_buttonPress"] = wasmExports["buttonPress"])(a0);
      var _buttonUnpress = Module["_buttonUnpress"] = (a0) => (_buttonUnpress = Module["_buttonUnpress"] = wasmExports["buttonUnpress"])(a0);
      var _toggleRewind = Module["_toggleRewind"] = (a0) => (_toggleRewind = Module["_toggleRewind"] = wasmExports["toggleRewind"])(a0);
      var _setVolume = Module["_setVolume"] = (a0) => (_setVolume = Module["_setVolume"] = wasmExports["setVolume"])(a0);
      var _getVolume = Module["_getVolume"] = () => (_getVolume = Module["_getVolume"] = wasmExports["getVolume"])();
      var _getMainLoopTimingMode = Module["_getMainLoopTimingMode"] = () => (_getMainLoopTimingMode = Module["_getMainLoopTimingMode"] = wasmExports["getMainLoopTimingMode"])();
      var _getMainLoopTimingValue = Module["_getMainLoopTimingValue"] = () => (_getMainLoopTimingValue = Module["_getMainLoopTimingValue"] = wasmExports["getMainLoopTimingValue"])();
      var _setMainLoopTiming = Module["_setMainLoopTiming"] = (a0, a1) => (_setMainLoopTiming = Module["_setMainLoopTiming"] = wasmExports["setMainLoopTiming"])(a0, a1);
      var _setFastForwardMultiplier = Module["_setFastForwardMultiplier"] = (a0) => (_setFastForwardMultiplier = Module["_setFastForwardMultiplier"] = wasmExports["setFastForwardMultiplier"])(a0);
      var _getFastForwardMultiplier = Module["_getFastForwardMultiplier"] = () => (_getFastForwardMultiplier = Module["_getFastForwardMultiplier"] = wasmExports["getFastForwardMultiplier"])();
      var _quitGame = Module["_quitGame"] = () => (_quitGame = Module["_quitGame"] = wasmExports["quitGame"])();
      var _free = (a0) => (_free = wasmExports["free"])(a0);
      var _quitMgba = Module["_quitMgba"] = () => (_quitMgba = Module["_quitMgba"] = wasmExports["quitMgba"])();
      var _quickReload = Module["_quickReload"] = () => (_quickReload = Module["_quickReload"] = wasmExports["quickReload"])();
      var _pauseGame = Module["_pauseGame"] = () => (_pauseGame = Module["_pauseGame"] = wasmExports["pauseGame"])();
      var _resumeGame = Module["_resumeGame"] = () => (_resumeGame = Module["_resumeGame"] = wasmExports["resumeGame"])();
      var _pauseAudio = Module["_pauseAudio"] = () => (_pauseAudio = Module["_pauseAudio"] = wasmExports["pauseAudio"])();
      var _resumeAudio = Module["_resumeAudio"] = () => (_resumeAudio = Module["_resumeAudio"] = wasmExports["resumeAudio"])();
      var _setEventEnable = Module["_setEventEnable"] = (a0) => (_setEventEnable = Module["_setEventEnable"] = wasmExports["setEventEnable"])(a0);
      var _bindKey = Module["_bindKey"] = (a0, a1) => (_bindKey = Module["_bindKey"] = wasmExports["bindKey"])(a0, a1);
      var _saveState = Module["_saveState"] = (a0) => (_saveState = Module["_saveState"] = wasmExports["saveState"])(a0);
      var _loadState = Module["_loadState"] = (a0) => (_loadState = Module["_loadState"] = wasmExports["loadState"])(a0);
      var _autoLoadCheats = Module["_autoLoadCheats"] = () => (_autoLoadCheats = Module["_autoLoadCheats"] = wasmExports["autoLoadCheats"])();
      var _loadGame = Module["_loadGame"] = (a0, a1) => (_loadGame = Module["_loadGame"] = wasmExports["loadGame"])(a0, a1);
      var _saveStateSlot = Module["_saveStateSlot"] = (a0, a1) => (_saveStateSlot = Module["_saveStateSlot"] = wasmExports["saveStateSlot"])(a0, a1);
      var _loadStateSlot = Module["_loadStateSlot"] = (a0, a1) => (_loadStateSlot = Module["_loadStateSlot"] = wasmExports["loadStateSlot"])(a0, a1);
      var _addCoreCallbacks = Module["_addCoreCallbacks"] = (a0, a1, a2, a3, a4, a5) => (_addCoreCallbacks = Module["_addCoreCallbacks"] = wasmExports["addCoreCallbacks"])(a0, a1, a2, a3, a4, a5);
      var _setIntegerCoreSetting = Module["_setIntegerCoreSetting"] = (a0, a1) => (_setIntegerCoreSetting = Module["_setIntegerCoreSetting"] = wasmExports["setIntegerCoreSetting"])(a0, a1);
      var _setupConstants = Module["_setupConstants"] = () => (_setupConstants = Module["_setupConstants"] = wasmExports["setupConstants"])();
      var _main = Module["_main"] = (a0, a1) => (_main = Module["_main"] = wasmExports["main"])(a0, a1);
      var _malloc = (a0) => (_malloc = wasmExports["malloc"])(a0);
      var _pthread_self = () => (_pthread_self = wasmExports["pthread_self"])();
      var __emscripten_tls_init = () => (__emscripten_tls_init = wasmExports["_emscripten_tls_init"])();
      var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports["emscripten_builtin_memalign"])(a0, a1);
      var __emscripten_run_callback_on_thread = (a0, a1, a2, a3, a4) => (__emscripten_run_callback_on_thread = wasmExports["_emscripten_run_callback_on_thread"])(a0, a1, a2, a3, a4);
      var __emscripten_thread_init = (a0, a1, a2, a3, a4, a5) => (__emscripten_thread_init = wasmExports["_emscripten_thread_init"])(a0, a1, a2, a3, a4, a5);
      var __emscripten_thread_crashed = () => (__emscripten_thread_crashed = wasmExports["_emscripten_thread_crashed"])();
      var __emscripten_run_on_main_thread_js = (a0, a1, a2, a3, a4) => (__emscripten_run_on_main_thread_js = wasmExports["_emscripten_run_on_main_thread_js"])(a0, a1, a2, a3, a4);
      var __emscripten_thread_free_data = (a0) => (__emscripten_thread_free_data = wasmExports["_emscripten_thread_free_data"])(a0);
      var __emscripten_thread_exit = (a0) => (__emscripten_thread_exit = wasmExports["_emscripten_thread_exit"])(a0);
      var __emscripten_check_mailbox = () => (__emscripten_check_mailbox = wasmExports["_emscripten_check_mailbox"])();
      var _setThrew = (a0, a1) => (_setThrew = wasmExports["setThrew"])(a0, a1);
      var _emscripten_stack_set_limits = (a0, a1) => (_emscripten_stack_set_limits = wasmExports["emscripten_stack_set_limits"])(a0, a1);
      var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(a0);
      var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);
      var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();
      var _GBAInputInfo = Module["_GBAInputInfo"] = 122336;
      var _binaryName = Module["_binaryName"] = 198368;
      var _projectName = Module["_projectName"] = 198372;
      var _projectVersion = Module["_projectVersion"] = 198376;
      var _gitCommit = Module["_gitCommit"] = 198352;
      var _gitCommitShort = Module["_gitCommitShort"] = 198356;
      var _gitBranch = Module["_gitBranch"] = 198360;
      var _gitRevision = Module["_gitRevision"] = 198364;
      var _GBIORegisterNames = Module["_GBIORegisterNames"] = 60704;
      var _GBSavestateMagic = Module["_GBSavestateMagic"] = 75968;
      var _GBSavestateVersion = Module["_GBSavestateVersion"] = 75972;
      var _GBA_LUX_LEVELS = Module["_GBA_LUX_LEVELS"] = 105440;
      var _GBAVideoObjSizes = Module["_GBAVideoObjSizes"] = 149776;
      var _GBASavestateMagic = Module["_GBASavestateMagic"] = 149552;
      var _GBASavestateVersion = Module["_GBASavestateVersion"] = 149556;
      function invoke_iiiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vii(index, a1, a2) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_ii(index, a1) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iii(index, a1, a2) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vi(index, a1) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      Module["cwrap"] = cwrap;
      Module["addFunction"] = addFunction;
      Module["removeFunction"] = removeFunction;
      Module["FS"] = FS;
      function callMain() {
        var entryFunction = _main;
        var argc = 0;
        var argv = 0;
        try {
          var ret = entryFunction(argc, argv);
          exitJS(
            ret,
            /* implicit = */
            true
          );
          return ret;
        } catch (e) {
          return handleException(e);
        }
      }
      function run() {
        if (runDependencies > 0) {
          dependenciesFulfilled = run;
          return;
        }
        if (ENVIRONMENT_IS_PTHREAD) {
          readyPromiseResolve(Module);
          initRuntime();
          return;
        }
        preRun();
        if (runDependencies > 0) {
          dependenciesFulfilled = run;
          return;
        }
        function doRun() {
          Module["calledRun"] = true;
          if (ABORT) return;
          initRuntime();
          preMain();
          readyPromiseResolve(Module);
          Module["onRuntimeInitialized"]?.();
          var noInitialRun = Module["noInitialRun"];
          if (!noInitialRun) callMain();
          postRun();
        }
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(() => {
            setTimeout(() => Module["setStatus"](""), 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      run();
      moduleRtn = readyPromise;
      return moduleRtn;
    };
  })();
  var mgba_default = mGBA;
  var isPthread = globalThis.self?.name?.startsWith("em-pthread");
  isPthread && mGBA();
  return __toCommonJS(mgba_exports);
})();
