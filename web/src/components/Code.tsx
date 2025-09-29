import { TabProvider } from './CodeTabContext'
import CodeTabs from './CodeTabs'
import MultiSequence from './MultiSequence'

const Code = () => (
  <TabProvider initialTab="ml">
    <div className="relative w-full font-mono">
      <div className="text-left mb-8 rounded-md border border-[var(--shiki-tab-border)]">
        <div className="tab-container text-left">
          <div className="tabnav pt-2 px-2 mb-0 bg-[var(--shiki-tab-background)] rounded-tl-md rounded-tr-md border border-[var(--shiki-tab-border)]">
            <nav
              className="tabnav-tabs flex overflow-hidden"
              style={{ marginBottom: '-1px' }}
            >
              <CodeTabs />
            </nav>
          </div>
          <div className="tabpanel p-3 relative bg-[var(--shiki-background)] rounded-bl-md rounded-br-md ">
            <div className="flex">
              <div className="text-right select-none text-[#adbdcc]">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    className="text-sm font-mono"
                    key={i + 1}
                    style={{
                      minHeight: '25px',
                      display: 'block',
                      whiteSpace: 'pre-line',
                      borderBottom: '1px solid transparent',
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <MultiSequence />
            </div>
          </div>
        </div>
      </div>
    </div>
  </TabProvider>
)

export default Code
