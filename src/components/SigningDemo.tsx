import { useRef, useState } from 'react';

type Decision = 'pending' | 'approved' | 'denied';

function DecisionResult({
  decision,
  reset,
}: {
  decision: Exclude<Decision, 'pending'>;
  reset: () => void;
}) {
  const approved = decision === 'approved';
  return (
    <div className="demo-result">
      <span className={`result-seal ${approved ? 'success' : 'refused'}`} aria-hidden="true">
        {approved ? '✓' : '×'}
      </span>
      <h3 tabIndex={-1} ref={(heading) => heading?.focus()}>
        {approved ? 'You approved this note.' : 'You denied this request.'}
      </h3>
      <p>
        {approved
          ? 'In Ostrilo, signing happens locally. The website receives a signed event and can publish it as you.'
          : 'In Ostrilo, the website receives a refusal. It gets no signature for this request.'}
      </p>
      <p className="demo-example">This walkthrough creates no keys or signatures.</p>
      <button type="button" className="button button-secondary" onClick={reset}>
        Try the other decision
      </button>
    </div>
  );
}

function RequestDetails() {
  return (
    <>
      <div className="demo-origin">
        <span className="origin-seal" aria-hidden="true">
          N
        </span>
        <div>
          <code>https://client.example</code>
          <span>A website is asking to publish as you.</span>
        </div>
        <span className="status-chip">First visit</span>
      </div>
      <dl className="demo-facts">
        <div>
          <dt>Signing as</dt>
          <dd>Personal identity</dd>
        </div>
        <div>
          <dt>Event kind</dt>
          <dd>
            <code>1</code> · Short text note
          </dd>
        </div>
        <div>
          <dt>Permission</dt>
          <dd>Always asks for approval</dd>
        </div>
      </dl>
      <div className="demo-content">
        <p className="section-label">The note you’re signing</p>
        <blockquote>Trying a new Nostr client. Same identity, a different view.</blockquote>
      </div>
      <details className="demo-json">
        <summary>View example event</summary>
        <pre>
          {JSON.stringify(
            {
              kind: 1,
              content: 'Trying a new Nostr client. Same identity, a different view.',
              tags: [],
              created_at: 1791374400,
            },
            null,
            2,
          )}
        </pre>
      </details>
    </>
  );
}

export default function SigningDemo() {
  const [decision, setDecision] = useState<Decision>('pending');
  const title = useRef<HTMLHeadingElement>(null);
  function reset() {
    setDecision('pending');
    title.current?.focus();
  }
  return (
    <section className="signing-demo" aria-labelledby="demo-title">
      <div className="demo-heading">
        <span className="section-label">Interactive walkthrough</span>
        <span className="demo-local">Example data only</span>
      </div>
      <div className="demo-title">
        <h2 id="demo-title" tabIndex={-1} ref={title}>
          A signature starts with your say.
        </h2>
        <p>See the request. Make the call.</p>
      </div>
      <div className="demo-request" aria-live="polite">
        {decision === 'pending' ? (
          <>
            <RequestDetails />
            <div className="demo-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setDecision('denied')}
              >
                Deny
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setDecision('approved')}
              >
                Approve example
              </button>
            </div>
            <p className="demo-footnote">No extension connection. No real signing.</p>
          </>
        ) : (
          <DecisionResult decision={decision} reset={reset} />
        )}
      </div>
    </section>
  );
}
