import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';
import { WebSocket } from 'ws';

async function run() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--disable-gpu',
    '--window-size=1440,900',
    '--remote-debugging-port=9240',
    'http://localhost:5181'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://localhost:9240/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const wsUrl = tabs[0].webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

      let msgId = 1;
      const send = (method, params = {}) => new Promise((resolve) => {
        const id = msgId++;
        const handler = (rawData) => {
          const res = JSON.parse(rawData);
          if (res.id === id) {
            ws.off('message', handler);
            resolve(res.result);
          }
        };
        ws.on('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });

      ws.on('open', async () => {
        // Wait 2s for page to render
        await new Promise(r => setTimeout(r, 2000));

        // 1. Capture Program Board (with red dependency strings)
        let screenshot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('/Users/layyzee/.gemini/antigravity/brain/45615f03-778e-4bc5-85ce-c92a43547f5c/piplanner_program_board.png', Buffer.from(screenshot.data, 'base64'));
        console.log('Saved piplanner_program_board.png');

        // 2. Open SAFe 101 Explainer Drawer
        await send('Runtime.evaluate', {
          expression: `
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('SAFe 101 Guide') || b.textContent.includes('Cheat Sheet'));
            if (btn) btn.click();
          `
        });
        await new Promise(r => setTimeout(r, 600));

        screenshot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('/Users/layyzee/.gemini/antigravity/brain/45615f03-778e-4bc5-85ce-c92a43547f5c/piplanner_safe_explainer.png', Buffer.from(screenshot.data, 'base64'));
        console.log('Saved piplanner_safe_explainer.png');

        // Close Drawer
        await send('Runtime.evaluate', {
          expression: `
            const closeBtn = document.querySelector('aside button');
            if (closeBtn) closeBtn.click();
          `
        });
        await new Promise(r => setTimeout(r, 400));

        // 3. Switch to ROAM Risks Tab
        await send('Runtime.evaluate', {
          expression: `
            const roamTab = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ROAM Risks'));
            if (roamTab) roamTab.click();
          `
        });
        await new Promise(r => setTimeout(r, 600));

        screenshot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('/Users/layyzee/.gemini/antigravity/brain/45615f03-778e-4bc5-85ce-c92a43547f5c/piplanner_roam_board.png', Buffer.from(screenshot.data, 'base64'));
        console.log('Saved piplanner_roam_board.png');

        // 4. Switch to PI Objectives Tab
        await send('Runtime.evaluate', {
          expression: `
            const objTab = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('PI Objectives'));
            if (objTab) objTab.click();
          `
        });
        await new Promise(r => setTimeout(r, 600));

        screenshot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('/Users/layyzee/.gemini/antigravity/brain/45615f03-778e-4bc5-85ce-c92a43547f5c/piplanner_objectives_vote.png', Buffer.from(screenshot.data, 'base64'));
        console.log('Saved piplanner_objectives_vote.png');

        chrome.kill();
        process.exit(0);
      });
    });
  });
}

run();
