const inspectionData = [
    {
        category: "PART 1 — Laptop Identity & Configuration",
        tests: [
            { id: 1, title: "System Information", purpose: "(এই test কেন করছি: ল্যাপটপের বেসিক মডেল এবং স্পেকস চেক করতে)", meemo: "চল, ল্যাপটপের আসল পরিচয় বের করি! মডেল কি বিক্রেতার কথার সাথে মিলছে?", gui: "Start → Search → System Information", command: "msinfo32", instruction: "System Model, Processor, এবং Installed Physical Memory চেক করুন।", expected: "মডেল ও স্পেসিফিকেশন বিক্রেতার কথার সাথে মিলেছে।", warning: "মডেল বা প্রসেসর ভিন্ন।", next: "CPU Information চেক করুন।" },
            { id: 2, title: "CPU Information", purpose: "(প্রসেসরের কোর এবং স্পিড যাচাই)", meemo: "প্রসেসরটি ঠিকমত কাজ করছে কিনা দেখি।", gui: "Task Manager → Performance → CPU", command: "Get-CimInstance Win32_Processor | Select-Object Name,Manufacturer,NumberOfCores", instruction: "Cores এবং Logical Processors চেক করুন।", expected: "সঠিক প্রসেসর কোর দেখাচ্ছে।", warning: "প্রসেসরের নাম ভিন্ন বা কোর সংখ্যা কম দেখাচ্ছে।", next: "CPU Load চেক করুন।" },
            { id: 3, title: "CPU Load/Performance", purpose: "(স্বাভাবিক অবস্থায় লোড যাচাই)", meemo: "ল্যাপটপ কি অযথাই গরম হচ্ছে বা CPU ১০০% হয়ে আছে?", gui: "Task Manager", command: "N/A", instruction: "ল্যাপটপ আইডল অবস্থায় CPU Usage দেখুন।", expected: "Idle অবস্থায় CPU Usage 1-10% এর মধ্যে আছে।", warning: "Idle অবস্থায় CPU 50%+ হয়ে আছে।", next: "GPU সেকশনে যান।" }
        ]
    },
    {
        category: "PART 2 — GPU",
        tests: [
            { id: 4, title: "GPU Information", purpose: "(গ্রাফিক্স কার্ডের তথ্য যাচাই)", meemo: "Dedicated GPU থাকলে সেটা ঠিকমত ডিটেক্ট করছে কিনা দেখি।", gui: "Task Manager → Performance → GPU", command: "dxdiag", instruction: "Display ট্যাবে গিয়ে GPU মডেল ও VRAM চেক করুন।", expected: "সঠিক GPU মডেল শো করছে।", warning: "Microsoft Basic Display Adapter লেখা থাকলে ড্রাইভার বা হার্ডওয়্যার ইস্যু।", next: "Stress Test।" },
            { id: 5, title: "GPU Stress Test", purpose: "(লোড পড়লে স্ক্রিন ব্ল্যাক হয় কিনা)", meemo: "একটু লোড দিয়ে দেখি স্ক্রিন ফ্লিকার করে কিনা!", gui: "Run a heavy 3D app or webgl benchmark", command: "devmgmt.msc", instruction: "Device Manager এ গিয়ে Display Adapters এ হলুদ চিহ্ন (Warning) আছে কিনা দেখুন।", expected: "কোনো Error Code বা Warning নেই।", warning: "Yellow Triangle (Code 43) মানে GPU নষ্ট বা ফল্টি।", next: "RAM চেক করুন।" }
        ]
    },
    {
        category: "PART 3 — RAM",
        tests: [
            { id: 6, title: "RAM Capacity/Speed", purpose: "(RAM এর স্পিড এবং ক্যাপাসিটি)", meemo: "কতো জিবি র‍্যাম আর কতো স্পিড, মিলিয়ে নাও।", gui: "Task Manager → Performance → Memory", command: "Get-CimInstance Win32_PhysicalMemory | Select-Object Capacity,Speed", instruction: "Speed (MHz) এবং Form Factor চেক করুন।", expected: "স্পিড এবং ক্যাপাসিটি সঠিক।", warning: "বলার চেয়ে কম র‍্যাম দেখাচ্ছে।", next: "RAM Error Test।" },
            { id: 7, title: "RAM Error Test", purpose: "(র‍্যামে কোনো ফল্ট আছে কিনা)", meemo: "RAM এ কোনো physical error থাকলে ল্যাপটপ রিস্টার্ট নিতে পারে।", gui: "Start → Windows Memory Diagnostic", command: "mdsched.exe", instruction: "Run করে Restart দিন (সময় লাগতে পারে)।", expected: "No memory errors detected.", warning: "Hardware problems detected.", next: "Upgradeability চেক।" },
            { id: 8, title: "RAM Upgradeability", purpose: "(ভবিষ্যতে র‍্যাম বাড়ানো যাবে কিনা)", meemo: "র‍্যাম কি সোল্ডার করা নাকি স্লট খালি আছে?", gui: "Task Manager → Memory", command: "wmic memphysical get MaxCapacity", instruction: "Slots used: 1 of 2 লেখা আছে কিনা দেখুন।", expected: "খালি স্লট আছে বা পরিবর্তনযোগ্য।", warning: "Soldered RAM এবং ফুল ক্যাপাসিটি ব্যবহার করা (আপগ্রেড অসম্ভব)।", next: "Storage চেক করুন।" }
        ]
    },
    {
        category: "PART 4 — SSD/HDD",
        tests: [
            { id: 9, title: "Storage Information", purpose: "(স্টোরেজের ধরন ও সাইজ)", meemo: "HDD নাকি SSD এবং কতো জিবি?", gui: "Task Manager → Disk", command: "Get-PhysicalDisk | Format-Table FriendlyName,MediaType,Size", instruction: "MediaType (SSD/HDD) এবং Size দেখুন।", expected: "বিক্রেতার বলা সাইজ ও টাইপ মিলেছে।", warning: "SSD এর বদলে HDD বা সাইজ কম।", next: "Physical Disk Health।" },
            { id: 10, title: "Physical Disk Health", purpose: "(ডিস্কের সাধারণ স্বাস্থ্য)", meemo: "ডিস্ক ঠিক আছে তো?", gui: "Disk Management", command: "Get-Disk | Format-Table HealthStatus", instruction: "Health Status দেখুন।", expected: "Healthy.", warning: "Unhealthy বা Warning.", next: "SMART চেক।" },
            { id: 11, title: "SSD/HDD SMART", purpose: "(গভীর হার্ডওয়্যার লেভেল চেক)", meemo: "CrystalDiskInfo (3rd party) দিয়ে চেক করা ভালো, তবে উইন্ডোজ থেকেও বেসিক দেখা যায়।", gui: "Command Prompt (Admin)", command: "wmic diskdrive get status", instruction: "Status চেক করুন।", expected: "OK", warning: "Pred Fail বা Bad", next: "SSD Speed।" },
            { id: 12, title: "SSD Speed", purpose: "(রিড/রাইট স্পিড ঠিক আছে কিনা)", meemo: "ফাইল কপি হতে কেমন সময় লাগে?", gui: "Task Manager", command: "winsat disk -drive c", instruction: "Disk Sequential Read স্পিড দেখুন।", expected: "স্বাভাবিক স্পিড (SSD এর ক্ষেত্রে 400MB/s+)।", warning: "খুবই ধীরগতি বা ফ্রিজ হয়ে যাওয়া।", next: "Display চেক।" }
        ]
    },
    {
        category: "PART 5 — Display",
        tests: [
            { id: 13, title: "Resolution/Refresh Rate", purpose: "(স্ক্রিনের কোয়ালিটি)", meemo: "Full HD নাকি 4K? 60Hz নাকি 120Hz?", gui: "Settings → System → Display → Advanced display", command: "N/A", instruction: "Resolution ও Refresh Rate মিলিয়ে নিন।", expected: "সঠিক রেজোলিউশন দেখাচ্ছে।", warning: "রেজোলিউশন কম বা পরিবর্তন করা যাচ্ছে না।", next: "Dead Pixel Test." },
            { id: 14, title: "Dead Pixel Test", purpose: "(স্ক্রিনে কোনো স্পট আছে কিনা)", meemo: "ফুলস্ক্রিন জুড়ে White, Black, Red, Green, Blue কালার দিয়ে চেক করো।", gui: "Browser (Search: Dead Pixel Test)", command: "N/A", instruction: "খুব কাছ থেকে প্রতিটি কালার স্ক্রিনে দেখুন।", expected: "কোনো কালো বা রঙিন বিন্দু/দাগ নেই।", warning: "সাদা স্পট (Pressure mark) বা ডেড পিক্সেল আছে।", next: "Screen Angle Test." },
            { id: 15, title: "Screen Angle Test", purpose: "(ভিউইং এঙ্গেল)", meemo: "পাশ থেকে বা উপর-নিচ থেকে দেখলে স্ক্রিন কেমন দেখায়?", gui: "Physical", command: "N/A", instruction: "ল্যাপটপের স্ক্রিন বিভিন্ন এঙ্গেলে ঘুরিয়ে দেখুন।", expected: "IPS প্যানেল হলে সব দিক থেকে ক্লিয়ার।", warning: "TN প্যানেলের কালার ওয়াশআউট হওয়া (যদিও এটি হার্ডওয়্যার ফল্ট নয়, প্যানেল টাইপ)।", next: "Brightness Test." },
            { id: 16, title: "Brightness Test", purpose: "(ব্যাকলাইট ঠিক আছে কিনা)", meemo: "ব্রাইটনেস কমালে-বাড়ালে কোনো সমস্যা হয় কি?", gui: "Action Center / Keyboard Keys", command: "N/A", instruction: "ব্রাইটনেস ০ থেকে ১০০% করুন।", expected: "স্মুথলি কাজ করছে, ফ্লিকারিং নেই।", warning: "ব্রাইটনেস কাজ করে না বা স্ক্রিন কাঁপে।", next: "Battery চেক।" }
        ]
    },
    {
        category: "PART 6 — Battery",
        tests: [
            { id: 17, title: "Battery Report", purpose: "(ব্যাটারির আসল স্বাস্থ্য জানা)", meemo: "Design Capacity আর Full Charge Capacity তুলনা করে দেখি ব্যাটারির অবস্থা কী!", gui: "N/A", command: "powercfg /batteryreport", instruction: "কমান্ডটি রান করে C:\\ ব্যাটারি রিপোর্ট ফাইলটি ব্রাউজারে ওপেন করুন।", expected: "Full Charge Capacity, Design Capacity এর কাছাকাছি (৭০%+)।", warning: "ক্যাপাসিটি অর্ধেকের নিচে নেমে গেছে বা Cycle Count অনেক বেশি।", next: "Real Battery Test." },
            { id: 18, title: "Real Battery Test", purpose: "(হঠাৎ চার্জ ড্রপ হয় কিনা)", meemo: "চার্জার খুলে ৫ মিনিট ব্যবহার করে দেখো পার্সেন্টেজ লাফাচ্ছে কিনা।", gui: "Physical / Battery Icon", command: "N/A", instruction: "ব্রাইটনেস ফুল করে ইউটিউবে ভিডিও চালান।", expected: "স্বাভাবিকভাবে চার্জ কমছে।", warning: "হঠাৎ ২০% ড্রপ বা ল্যাপটপ বন্ধ হয়ে যাওয়া।", next: "Battery Swelling." },
            { id: 19, title: "Battery Swelling", purpose: "(ফিজিক্যাল ব্যাটারি সেফটি)", meemo: "ব্যাটারি ফুলে গেলে টাচপ্যাড বা কীবোর্ড উঁচু হয়ে যায়। এটি বিপজ্জনক!", gui: "Physical", command: "N/A", instruction: "ল্যাপটপের পাম রেস্ট বা টাচপ্যাডের চারপাশে হাত বুলিয়ে দেখুন উঁচু হয়ে আছে কিনা।", expected: "পুরোপুরি সমতল।", warning: "উঁচু হয়ে আছে (অবিলম্বে ব্যাটারি বদলাতে হবে)।", next: "Charger চেক।" }
        ]
    },
    {
        category: "PART 7 — Charger & Charging",
        tests: [
            { id: 20, title: "Charger", purpose: "(অরিজিনাল চার্জার কিনা)", meemo: "চার্জারের ওয়াটেজ ল্যাপটপের সাথে ম্যাচ করে তো?", gui: "Physical", command: "N/A", instruction: "চার্জারের স্টিকারে Output Voltage (V) এবং Ampere (A) গুণ করে Wattage বের করুন।", expected: "সঠিক ওয়াটের অরিজিনাল বা ভালো মানের চার্জার।", warning: "আন্ডারপাওয়ার্ড চার্জার (ল্যাপটপ চার্জ হতে অনেক সময় নেবে)।", next: "Charging Port." },
            { id: 21, title: "Charging Port", purpose: "(প্লাগ লুজ কিনা)", meemo: "প্লাগ লাগানোর পর একটু নড়ালে চার্জিং ছেড়ে দেয় কিনা দেখো।", gui: "Physical", command: "N/A", instruction: "চার্জার লাগিয়ে একটু নেড়ে দেখুন।", expected: "চার্জ কন্টিনিউ হচ্ছে।", warning: "একটু নড়লেই চার্জ ডিসকানেক্ট হচ্ছে (পোর্টের সমস্যা)।", next: "Keyboard চেক।" }
        ]
    },
    {
        category: "PART 8 — Keyboard & Touchpad",
        tests: [
            { id: 22, title: "Keyboard", purpose: "(সব বাটন কাজ করে কিনা)", meemo: "অনলাইন কীবোর্ড টেস্টার দিয়ে সবগুলো বাটন চাপো।", gui: "Browser (Search: Keyboard Tester)", command: "N/A", instruction: "A-Z, 0-9, Fn, Space, Enter সব চেক করুন। ব্যাকলাইট থাকলে চেক করুন।", expected: "সব বাটন রেসপন্সিভ।", warning: "কোনো বাটন কাজ করে না বা দুইবার টাইপ হয়।", next: "Touchpad." },
            { id: 23, title: "Touchpad", purpose: "(মাউসের কাজ)", meemo: "লেফট ক্লিক, রাইট ক্লিক এবং মাল্টি-টাচ কাজ করছে?", gui: "Physical", command: "N/A", instruction: "পুরো টাচপ্যাড জুড়ে আঙুল ঘোরান। জেসচার (২ আঙুল দিয়ে স্ক্রল) চেক করুন।", expected: "স্মুথ এবং সব ক্লিক কাজ করছে।", warning: "কার্সর লাফায় বা ক্লিক কাজ করে না।", next: "Audio/Cam." }
        ]
    },
    {
        category: "PART 9 — Audio / Microphone / Webcam",
        tests: [
            { id: 24, title: "Speaker", purpose: "(সাউন্ড কোয়ালিটি)", meemo: "ফুল ভলিউমে গান বাজিয়ে দেখো সাউন্ড ফাটে কিনা।", gui: "Taskbar Sound Icon", command: "N/A", instruction: "Left এবং Right ব্যালেন্স চেক করুন।", expected: "ক্লিয়ার সাউন্ড।", warning: "ডিস্টরশন বা সাউন্ড ফাটা।", next: "Headphone Jack." },
            { id: 25, title: "Headphone Jack", purpose: "(অডিও পোর্ট)", meemo: "ইয়ারফোন লাগিয়ে চেক করো।", gui: "Physical", command: "N/A", instruction: "ইয়ারফোন কানেক্ট করে সাউন্ড শুনুন।", expected: "ইয়ারফোনে ক্লিয়ার সাউন্ড আসছে।", warning: "এক কানে সাউন্ড আসে বা লুজ কানেকশন।", next: "Microphone." },
            { id: 26, title: "Microphone", purpose: "(ভয়েস রেকর্ডিং)", meemo: "Voice Recorder ওপেন করে কথা রেকর্ড করে শোনো।", gui: "Start → Voice Recorder", command: "N/A", instruction: "রেকর্ড করে প্লেব্যাক শুনুন।", expected: "আপনার কথা ক্লিয়ার শোনা যাচ্ছে।", warning: "অনেক নয়েজ বা কিছুই রেকর্ড হয়নি।", next: "Webcam." },
            { id: 27, title: "Webcam", purpose: "(ক্যামেরা)", meemo: "ক্যামেরা ওপেন করে দেখো ছবি পরিষ্কার কিনা। Privacy Shutter থাকলে সরাও।", gui: "Start → Camera", command: "N/A", instruction: "ক্যামেরা অ্যাপ ওপেন করুন।", expected: "ছবি ঠিকমত দেখা যাচ্ছে।", warning: "কালো স্ক্রিন বা ফ্লিকারিং।", next: "Wi-Fi/BT." }
        ]
    },
    {
        category: "PART 10 — Wi-Fi / Bluetooth",
        tests: [
            { id: 28, title: "Wi-Fi", purpose: "(ওয়্যারলেস নেটওয়ার্ক)", meemo: "ওয়াইফাই কানেক্ট করে ইন্টারনেট ব্রাউজ করো।", gui: "Taskbar Network Icon", command: "netsh wlan show interfaces", instruction: "রাউটারের সাথে কানেক্ট করে Signal চেক করুন।", expected: "স্টেবল কানেকশন।", warning: "বারবার ডিসকানেক্ট হওয়া বা নেটওয়ার্ক না পাওয়া।", next: "Network Adapter." },
            { id: 29, title: "Network Adapter", purpose: "(হার্ডওয়্যার আইডেন্টিটি)", meemo: "নেটওয়ার্ক কার্ডের নাম দেখি।", gui: "Device Manager", command: "ipconfig /all", instruction: "Intel/Realtek/Broadcom அடাপ্টার চেক করুন।", expected: "সঠিক অ্যাডাপ্টার।", warning: "Device Manager এ নেটওয়ার্ক অ্যাডাপ্টারে হলুদ চিহ্ন।", next: "Bluetooth." },
            { id: 30, title: "Bluetooth", purpose: "(ব্লুটুথ কানেকশন)", meemo: "ফোন থেকে ব্লুটুথ দিয়ে ফাইল সেন্ড করে দেখো।", gui: "Settings → Bluetooth & devices", command: "N/A", instruction: "ফোন বা ইয়ারবাডস পেয়ার করুন।", expected: "সাকসেসফুলি কানেক্ট হয়েছে।", warning: "ডিভাইস খুঁজেই পাচ্ছে না।", next: "Ports." }
        ]
    },
    {
        category: "PART 11 — Ports",
        tests: [
            { id: 31, title: "USB-A / USB-C", purpose: "(পেনড্রাইভ ডিটেক্ট করে কিনা)", meemo: "ল্যাপটপের সবগুলো পোর্টে পেনড্রাইভ লাগিয়ে দেখো।", gui: "File Explorer", command: "N/A", instruction: "সব পোর্টে পেনড্রাইভ ইনসার্ট করুন।", expected: "সব পোর্ট ঠিকমত রিড করছে।", warning: "কোনো একটি পোর্ট ডেড।", next: "USB-C Capability." },
            { id: 32, title: "USB-C Capability", purpose: "(টাইপ-সি পোর্টের ফিচার)", meemo: "সব টাইপ-সি দিয়ে ডিসপ্লে বা চার্জিং হয় না! লোগো দেখে বোঝো।", gui: "Physical", command: "N/A", instruction: "পোর্টের পাশে Thunderbolt বা DisplayPort লোগো আছে কিনা দেখুন।", expected: "ফিচার স্পেসিফিকেশন অনুযায়ী কাজ করছে।", warning: "লুজ পোর্ট।", next: "HDMI / DisplayPort." },
            { id: 33, title: "HDMI / DisplayPort", purpose: "(এক্সটার্নাল ডিসপ্লে)", meemo: "সম্ভব হলে মনিটর বা টিভিতে লাগিয়ে দেখো।", gui: "Physical", command: "N/A", instruction: "কেবল কানেক্ট করুন।", expected: "এক্সটার্নাল মনিটরে স্ক্রিন শো করছে।", warning: "পোর্ট কাজ করছে না।", next: "SD Card." },
            { id: 34, title: "SD Card", purpose: "(মেমোরি কার্ড স্লট)", meemo: "SD কার্ড স্লট থাকলে চেক করো।", gui: "File Explorer", command: "N/A", instruction: "কার্ড লাগিয়ে রিড/রাইট চেক করুন।", expected: "রিড/রাইট হচ্ছে।", warning: "ডিটেক্ট করছে না।", next: "Ethernet/LAN." },
            { id: 35, title: "Ethernet/LAN", purpose: "(ল্যান ক্যাবল পোর্ট)", meemo: "RJ45 পোর্ট থাকলে কেবল লাগিয়ে দেখো ইন্টারনেট পায় কিনা।", gui: "Physical", command: "N/A", instruction: "কেবল লাগান।", expected: "লিঙ্ক লাইট ব্লিঙ্ক করছে এবং ইন্টারনেট পেয়েছে।", warning: "পোর্ট ভাঙা বা ডেড।", next: "Motherboard." }
        ]
    },
    {
        category: "PART 12 — Motherboard",
        tests: [
            { id: 36, title: "Baseboard Information", purpose: "(মাদারবোর্ডের সিরিয়াল/মডেল)", meemo: "মাদারবোর্ডের অরিজিনাল মডেল যাচাই করি।", gui: "System Information", command: "Get-CimInstance Win32_BaseBoard | Select-Object Manufacturer,Product", instruction: "মডেল ও ম্যানুফ্যাকচারার চেক করুন।", expected: "সঠিক মডেল শো করছে।", warning: "ভুল বা মিসিং তথ্য।", next: "Device Manager." },
            { id: 37, title: "Device Manager", purpose: "(কোনো ড্রাইভার মিসিং কিনা)", meemo: "Unknown Device বা হলুদ দাগ থাকলে মাদারবোর্ডের কোনো চিপে সমস্যা থাকতে পারে।", gui: "Start → Device Manager", command: "devmgmt.msc", instruction: "সবগুলো ট্রি এক্সপান্ড করে দেখুন।", expected: "সব ড্রাইভার ইন্সটল করা আছে, কোনো এরর নেই।", warning: "হলুদ চিহ্ন বা Unknown Device (বিশেষ করে System Devices এ)।", next: "Motherboard Functional Test." },
            { id: 38, title: "Motherboard Functional Test", purpose: "(পেরিফেরাল কন্ট্রোলার)", meemo: "কিবোর্ড, মাউস, অডিও, ইউএসবি - সব একসাথে কাজ করছে কিনা দেখো।", gui: "Physical", command: "N/A", instruction: "সব কম্পোনেন্ট স্বাভাবিক আচরণ করছে কিনা খেয়াল করুন।", expected: "সব ঠিক।", warning: "মাঝে মাঝে পোর্ট কাজ করা বন্ধ করে দেয়।", next: "BIOS/UEFI." }
        ]
    },
    {
        category: "PART 13 — BIOS / UEFI",
        tests: [
            { id: 39, title: "BIOS Access", purpose: "(বায়োসে ঢোকা যায় কিনা)", meemo: "ল্যাপটপ রিস্টার্ট দিয়ে BIOS এ ঢোকার চেষ্টা করো (F2/F10/Del/Enter)।", gui: "Restart + BIOS Key", command: "N/A", instruction: "বায়োসে অ্যাক্সেস করুন।", expected: "সফলভাবে বায়োসে ঢুকেছে।", warning: "বায়োসে ঢুকতে দিচ্ছে না।", next: "BIOS Version." },
            { id: 40, title: "BIOS Version", purpose: "(আপডেট স্ট্যাটাস)", meemo: "বায়োস কতো সালের আপডেট করা?", gui: "System Information", command: "Get-CimInstance Win32_BIOS | Select-Object SMBIOSBIOSVersion,ReleaseDate", instruction: "ভার্সন ও ডেট চেক করুন।", expected: "ভার্সন দেখা যাচ্ছে।", warning: "খুবই পুরনো (যদিও সমস্যা নেই, আপডেট করা লাগতে পারে)।", next: "BIOS Password." },
            { id: 41, title: "BIOS Password", purpose: "(লক করা কিনা)", meemo: "BIOS এ কোনো পাসওয়ার্ড চাইলে বিক্রেতাকে বলো রিমুভ করে দিতে। এটি খুব জরুরি!", gui: "BIOS Setup", command: "N/A", instruction: "বায়োসের সিকিউরিটি ট্যাবে গিয়ে দেখুন Admin/System Password সেট করা কিনা।", expected: "কোনো পাসওয়ার্ড সেট করা নেই।", warning: "পাসওয়ার্ড প্রোটেক্টেড (কখনোই পাসওয়ার্ড ছাড়া কিনবেন না)।", next: "Thermal." }
        ]
    },
    {
        category: "PART 14 — Cooling / Fan",
        tests: [
            { id: 42, title: "Temperature Monitoring", purpose: "(ল্যাপটপ বেশি গরম হয় কিনা)", meemo: "HWiNFO বা Task Manager দিয়ে টেম্পারেচার চেক করো।", gui: "Task Manager (GPU Temp)", command: "N/A", instruction: "লোড অবস্থায় টেম্পারেচার খেয়াল করুন।", expected: "স্বাভাবিক (CPU < 90°C, GPU < 85°C লোডে)।", warning: "অত্যধিক গরম হয়ে থ্রটল করছে (100°C)।", next: "Fan." },
            { id: 43, title: "Fan", purpose: "(ফ্যানের শব্দ ও কার্যকারিতা)", meemo: "ফ্যান কি ঘুরছে? কোনো অদ্ভুত আওয়াজ হচ্ছে?", gui: "Physical", command: "N/A", instruction: "ভেন্ট এর কাছে কান নিয়ে শুনুন বা বাতাস বের হচ্ছে কিনা অনুভব করুন।", expected: "স্বাভাবিক আওয়াজে ফ্যান বাতাস বের করছে।", warning: "খড়খড় শব্দ বা কোনো বাতাসই বের হচ্ছে না।", next: "Physical Body." }
        ]
    },
    {
        category: "PART 15 — Physical Body",
        tests: [
            { id: 44, title: "Chassis", purpose: "(বডির কন্ডিশন)", meemo: "ল্যাপটপের বডিতে বড় কোনো ডেন্ট বা ফাটল আছে কি?", gui: "Physical", command: "N/A", instruction: "পুরো বডি, কর্নার এবং তলার অংশ ভালো করে দেখুন।", expected: "সাধারণ স্ক্র্যাচ থাকতে পারে, ফাটল নেই।", warning: "বড় ডেন্ট (পড়ে যাওয়ার লক্ষণ) বা ফাটা বডি।", next: "Hinge." },
            { id: 45, title: "Hinge", purpose: "(স্ক্রিন খোলা-বন্ধ করা)", meemo: "ল্যাপটপ খুলতে বা বন্ধ করতে স্ক্রিন কি খুব বেশি নড়বড়ে মনে হয়?", gui: "Physical", command: "N/A", instruction: "স্ক্রিন কয়েকবার ধীরে ধীরে খুলুন ও বন্ধ করুন।", expected: "স্মুথ এবং স্টেবল।", warning: "কবজা ভাঙা বা খুব লুজ (স্ক্রিন নিজে থেকে হেলে পড়ে)।", next: "Liquid/Corrosion." },
            { id: 46, title: "Liquid/Corrosion", purpose: "(পানি পড়ার লক্ষণ)", meemo: "পোর্টের ভেতরে মরিচা বা আঠালো কিছু আছে কিনা দেখো।", gui: "Physical", command: "N/A", instruction: "ফ্ল্যাশলাইট দিয়ে পোর্টের ভেতরে তাকান।", expected: "পোর্ট ক্লিন।", warning: "মরিচা বা কফি/পানির দাগ (কখনোই কিনবেন না)।", next: "Windows Activation." }
        ]
    },
    {
        category: "PART 16 — Windows Activation & Security",
        tests: [
            { id: 47, title: "Windows Activation", purpose: "(উইন্ডোজ জেনুইন কিনা)", meemo: "উইন্ডোজ কি অ্যাক্টিভেটেড?", gui: "Settings → System → Activation", command: "slmgr /xpr", instruction: "কমান্ড রান করে দেখুন Permanently activated কিনা।", expected: "Windows is activated.", warning: "Not activated বা Expiration date দেখাচ্ছে (KMS crack)।", next: "Windows Update." },
            { id: 48, title: "Windows Update", purpose: "(আপডেট কাজ করে কিনা)", meemo: "আপডেট কি কাজ করছে নাকি কেউ ব্লক করে রেখেছে?", gui: "Settings → Windows Update", command: "N/A", instruction: "Check for updates এ ক্লিক করুন।", expected: "স্বাভাবিকভাবে চেক হচ্ছে।", warning: "Error কোড দেখাচ্ছে (সিস্টেম করাপ্ট হতে পারে)।", next: "Local User Accounts." },
            { id: 49, title: "Local User Accounts", purpose: "(ইউজার স্ট্যাটাস)", meemo: "কয়টা ইউজার একাউন্ট আছে সিস্টেমে?", gui: "Control Panel", command: "net user", instruction: "একাউন্ট লিস্ট চেক করুন।", expected: "শুধুমাত্র কারেন্ট ইউজার বা এডমিন।", warning: "অচেনা অনেক ইউজার একাউন্ট।", next: "Administrator Accounts." },
            { id: 50, title: "Administrator Accounts", purpose: "(এডমিন পারমিশন)", meemo: "তুমি কি এই ল্যাপটপে এডমিন?", gui: "Settings → Accounts", command: "Get-LocalGroupMember -Group 'Administrators'", instruction: "বর্তমান ইউজার এডমিন কিনা যাচাই করুন।", expected: "বর্তমান একাউন্ট এডমিন গ্রুপে আছে।", warning: "Standard User (সিস্টেমে কোনো চেঞ্জ করতে পারবেন না)।", next: "Organization Enrollment." },
            { id: 51, title: "Organization Enrollment", purpose: "(ল্যাপটপটি কোনো কোম্পানির কিনা)", meemo: "ল্যাপটপটি কি কোনো অফিস/কোম্পানির MDM এ লক করা? এটি খুব গুরুত্বপূর্ণ!", gui: "Settings → Accounts → Access work or school", command: "dsregcmd /status", instruction: "Device State এ AzureAdJoined বা EnterpriseJoined 'YES' কিনা দেখুন।", expected: "NO (পার্সোনাল ডিভাইস)।", warning: "YES (কোম্পানির ল্যাপটপ, রিসেট দিলে লক হয়ে যেতে পারে)।", next: "Event Viewer." }
        ]
    },
    {
        category: "PART 17 — Event Viewer",
        tests: [
            { id: 52, title: "System Error Log", purpose: "(লুকানো হার্ডওয়্যার এরর)", meemo: "Event Viewer এ দেখি ল্যাপটপটি বারবার ক্র্যাশ করে রিস্টার্ট হয়েছে কিনা।", gui: "Start → Event Viewer", command: "eventvwr.msc", instruction: "Windows Logs → System এ গিয়ে Critical (লাল আইকন) এরর খুঁজুন।", expected: "স্বাভাবিক কিছু ওয়ার্নিং থাকতে পারে, কিন্তু বারবার 'Kernel-Power' বা 'Disk' এরর নেই।", warning: "প্রচুর Disk error বা Unexpected shutdown (লুকানো হার্ডওয়্যার সমস্যা)।", next: "Cold Boot." }
        ]
    },
    {
        category: "PART 18 — Stability",
        tests: [
            { id: 53, title: "Cold Boot", purpose: "(স্টার্টআপ স্পিড)", meemo: "ল্যাপটপ পুরোপুরি শাটডাউন করে আবার অন করো। কতো সময় লাগে?", gui: "Power → Shut down", command: "N/A", instruction: "অন হতে কেমন সময় নেয় দেখুন।", expected: "SSD থাকলে ১০-১৫ সেকেন্ডে অন হয়ে যায়।", warning: "২-৩ মিনিট লাগছে বা ব্ল্যাক স্ক্রিনে আটকে থাকে।", next: "Restart." },
            { id: 54, title: "Restart", purpose: "(রিস্টার্ট লুপ)", meemo: "রিস্টার্ট দিলে ঠিকমত অন হয় তো?", gui: "Power → Restart", command: "N/A", instruction: "রিস্টার্ট দিন।", expected: "স্বাভাবিকভাবে রিস্টার্ট নেয়।", warning: "রিস্টার্ট দিলে ব্লু স্ক্রিন (BSOD) দেয়।", next: "Sleep/Wake." },
            { id: 55, title: "Sleep/Wake", purpose: "(স্লিপ থেকে ওঠা)", meemo: "ল্যাপটপের ঢাকনা বন্ধ করে স্লিপে পাঠাও, তারপর খুলে দেখো অন হয় কিনা।", gui: "Close Lid", command: "N/A", instruction: "স্লিপ থেকে জেগে ওঠার পর ওয়াইফাই, অডিও, টাচপ্যাড কাজ করে কিনা চেক করুন।", expected: "সাথে সাথেই অন হয় এবং সব কাজ করে।", warning: "স্লিপ থেকে আর অন হয় না (ফোর্স রিস্টার্ট দিতে হয়)।", next: "Energy Report." }
        ]
    },
    {
        category: "PART 19 — Power Diagnostics",
        tests: [
            { id: 56, title: "Energy Report", purpose: "(পাওয়ার ইস্যু আইডেন্টিফাই)", meemo: "পাওয়ার এফিশিয়েন্সি কেমন সেটা এনালাইজ করি।", gui: "N/A", command: "powercfg /energy", instruction: "কমান্ড রান করে (৬০ সেকেন্ড লাগবে) C:\\ energy-report.html ফাইল চেক করুন।", expected: "রিপোর্ট জেনারেট হয়েছে।", warning: "Critical battery or power failures reported.", next: "Supported Sleep States." },
            { id: 57, title: "Supported Sleep States", purpose: "(স্লিপ মোড সাপোর্ট)", meemo: "মডার্ন স্ট্যান্ডবাই সাপোর্ট করে কিনা?", gui: "N/A", command: "powercfg /a", instruction: "কী কী স্লিপ স্টেট এভেইলেবল দেখুন।", expected: "Standby (S3) বা Modern Standby Supported.", warning: "System firmware does not support sleep states.", next: "CPU Inventory." }
        ]
    },
    {
        category: "PART 20 — Hardware Inventory",
        tests: [
            { id: 58, title: "CPU Inventory", purpose: "(অফিসিয়াল ইনভেন্টরি চেক)", meemo: "PowerShell দিয়ে কনফার্ম হয়ে নিই।", gui: "N/A", command: "Get-CimInstance Win32_Processor | Select-Object Name,Manufacturer", instruction: "ডাটা চেক করুন।", expected: "সঠিক প্রসেসর।", warning: "ভুল প্রসেসর।", next: "RAM Inventory." },
            { id: 59, title: "RAM Inventory", purpose: "(পার্ট নাম্বার যাচাই)", meemo: "র‍্যামের আসল পার্ট নাম্বার কী?", gui: "N/A", command: "Get-CimInstance Win32_PhysicalMemory | Select-Object Manufacturer,PartNumber", instruction: "ডাটা চেক করুন।", expected: "সঠিক ডাটা।", warning: "N/A", next: "BIOS Inventory." },
            { id: 60, title: "BIOS Inventory", purpose: "(বায়োস সিরিয়াল)", meemo: "ল্যাপটপের সিরিয়াল নাম্বারের সাথে বায়োসের সিরিয়াল মিলে কিনা দেখো।", gui: "N/A", command: "Get-CimInstance Win32_BIOS | Select-Object SerialNumber", instruction: "ল্যাপটপের নিচের স্টিকারের সাথে সিরিয়াল মেলান।", expected: "মিলে গেছে।", warning: "সিরিয়াল আলাদা (মাদারবোর্ড চেঞ্জ হতে পারে)।", next: "Motherboard Inventory." },
            { id: 61, title: "Motherboard Inventory", purpose: "(মাদারবোর্ড সিরিয়াল)", meemo: "বোর্ডের সিরিয়াল যাচাই।", gui: "N/A", command: "Get-CimInstance Win32_BaseBoard | Select-Object SerialNumber", instruction: "ডাটা চেক করুন।", expected: "সঠিক সিরিয়াল।", warning: "N/A", next: "RAM Upgrade." }
        ]
    },
    {
        category: "PART 21 — Upgrade Compatibility",
        tests: [
            { id: 62, title: "RAM Upgrade", purpose: "(র‍্যাম আপগ্রেড সাপোর্ট)", meemo: "ল্যাপটপটি কতো জিবি পর্যন্ত র‍্যাম সাপোর্ট করবে?", gui: "Search exact laptop model specs online", command: "N/A", instruction: "ম্যানুফ্যাকচারারের সাইট চেক করুন।", expected: "আপগ্রেড করার সুযোগ আছে।", warning: "Max RAM Capacity তে পৌঁছে গেছে বা Soldered.", next: "SSD Upgrade." },
            { id: 63, title: "SSD Upgrade", purpose: "(স্টোরেজ আপগ্রেড সাপোর্ট)", meemo: "অতিরিক্ত M.2 বা 2.5 স্লট আছে কিনা জেনে নাও।", gui: "Search exact laptop model specs online", command: "N/A", instruction: "স্পেসিফিকেশন চেক করুন।", expected: "অতিরিক্ত স্লট আছে বা পরিবর্তন করা যাবে।", warning: "eMMC স্টোরেজ (যা বদলানো যায় না)।", next: "USB-C Feature Compatibility." },
            { id: 64, title: "USB-C Feature Compatibility", purpose: "(এক্সট্রা ফিচার সাপোর্ট)", meemo: "ভবিষ্যতে টাইপ-সি হাব দিয়ে মনিটর চালাতে পারবে কিনা?", gui: "Online Specs", command: "N/A", instruction: "Thunderbolt বা DisplayPort Alternate mode আছে কিনা যাচাই করুন।", expected: "সাপোর্টেড।", warning: "Data only (শুধু ফাইল ট্রান্সফার করা যাবে, ডিসপ্লে আসবে না)।", next: "Wi-Fi/Bluetooth Upgrade." },
            { id: 65, title: "Wi-Fi/Bluetooth Upgrade", purpose: "(ওয়াইফাই কার্ড বদলানো)", meemo: "ওয়াইফাই কার্ড সোল্ডার করা নাকি স্লটে বসানো?", gui: "Online Specs/Teardown Video", command: "N/A", instruction: "চেক করুন কার্ড আপগ্রেড করা যায় কিনা।", expected: "M.2 Wi-Fi স্লট আছে।", warning: "সোল্ডার করা।", next: "Box/Serial Verification." }
        ]
    },
    {
        category: "PART 22 — New Laptop",
        tests: [
            { id: 66, title: "Box/Serial Verification", purpose: "(বক্সের সাথে ল্যাপটপের সিরিয়াল)", meemo: "যদি ল্যাপটপটি বক্সে থাকে, তবে বক্সের সিরিয়াল আর ল্যাপটপের সফটওয়্যার সিরিয়াল মেলাও।", gui: "Settings → System → About", command: "N/A", instruction: "বক্সের স্টিকার এবং About পেজের সিরিয়াল মেলান।", expected: "হুবহু মিলেছে।", warning: "অমিল (ভুল বক্স বা ল্যাপটপ পরিবর্তিত)।", next: "Warranty Verification." },
            { id: 67, title: "Warranty Verification", purpose: "(ওয়ারেন্টি চেক)", meemo: "ব্র্যান্ডের ওয়েবসাইটে সিরিয়াল নাম্বার দিয়ে ওয়ারেন্টির মেয়াদ দেখো।", gui: "Brand Official Website Warranty Check", command: "N/A", instruction: "সিরিয়াল ইনপুট দিয়ে মেয়াদ দেখুন।", expected: "ওয়ারেন্টি কার্যকর আছে।", warning: "ওয়ারেন্টি শেষ বা ইনভ্যালিড সিরিয়াল।", next: "Factory Configuration." },
            { id: 68, title: "Factory Configuration", purpose: "(অরিজিনাল স্পেকস যাচাই)", meemo: "ফ্যাক্টরি থেকে যে র‍্যাম/এসএসডি দিয়ে আসার কথা সেটাই আছে তো?", gui: "Brand Website", command: "N/A", instruction: "স্পেসিফিকেশন শিট মেলান।", expected: "ফ্যাক্টরি স্পেকস ঠিক আছে।", warning: "অন্য কোম্পানির নিম্নমানের র‍্যাম বা এসএসডি লাগানো হয়েছে।", next: "Repair History." }
        ]
    },
    {
        category: "PART 23 — Used Laptop",
        tests: [
            { id: 69, title: "Repair History", purpose: "(পূর্বের সার্ভিসিং)", meemo: "বিক্রেতাকে জিজ্ঞেস করো আগে কোনো পার্টস চেঞ্জ বা মাদারবোর্ড রিপেয়ার হয়েছে কিনা।", gui: "Ask Seller", command: "N/A", instruction: "বিক্রেতার দাবি এবং ল্যাপটপের কন্ডিশন মিলিয়ে দেখুন (স্ক্রু খোলা আছে কিনা)।", expected: "কোনো মেজর রিপেয়ার হয়নি বা হলেও তা স্পষ্টভাবে জানানো হয়েছে।", warning: "রিপেয়ারের কথা গোপন করেছে কিন্তু স্ক্রু খোলার দাগ আছে।", next: "Parts Mismatch." },
            { id: 70, title: "Parts Mismatch", purpose: "(পার্টস পরিবর্তন)", meemo: "বিক্রেতা যা বলেছে আর তুমি যা পেলে—সব ঠিক আছে তো?", gui: "Seller Claim Verification", command: "N/A", instruction: "তোমার পাওয়া সব ডাটার সাথে বিক্রেতার দাবি মেলান।", expected: "সব তথ্য মিলেছে।", warning: "তথ্য গোপন করা হয়েছে বা স্পেসিফিকেশন বাড়িয়ে বলা হয়েছে।", next: "Finish" }
        ]
    }
];

// Flatten tests for easy access
const allTests = inspectionData.flatMap(cat => cat.tests);
