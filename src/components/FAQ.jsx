import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import { fetchTableData, subscribeCmsUpdate } from '../lib/supabaseClient';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqList, setFaqList] = useState(FAQ_DATA);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadFaqs() {
      const data = await fetchTableData('faqs', FAQ_DATA);
      if (Array.isArray(data)) {
        const normalized = data.map(f => ({
          ...f,
          question: f.question || f.q || '',
          answer: f.answer || f.a || ''
        }));
        const activeData = normalized.filter(f => f.is_active !== false);
        setFaqList(activeData);
      }
    }
    loadFaqs();

    const unsubscribe = subscribeCmsUpdate((tableName) => {
      if (tableName === 'faqs') {
        loadFaqs();
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredFaqs = faqList.filter(
    (faq) =>
      (faq.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.answer || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" style={{ padding: '96px 0', position: 'relative', background: 'var(--white)' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Head */}
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="var(--blue)" />
            <span>FAQs</span>
            <Sparkles size={14} color="var(--blue)" />
          </div>
          <h2 className="section-title">
            Frequently Asked <span style={{ color: 'var(--blue)' }}>Questions</span>
          </h2>
          <p className="section-sub">
            Learn more about K²V Technologies' IT service desk capabilities, support model, and ServiceNow integrations.
          </p>

          {/* Search Box */}
          <div
            style={{
              marginTop: '28px',
              position: 'relative',
              maxWidth: '520px',
              margin: '28px auto 0 auto'
            }}
          >
            <Search
              size={18}
              color="var(--ink-40)"
              style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 48px',
                borderRadius: '24px',
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--line)',
                color: 'var(--navy)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '24px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--navy)',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '16px'
                    }}
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: isOpen ? 'var(--blue)' : 'var(--ink-40)', flexShrink: 0 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            padding: '0 28px 24px 28px',
                            color: 'var(--ink-60)',
                            fontSize: '0.96rem',
                            lineHeight: 1.7
                          }}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--ink-40)', padding: '40px', background: '#ffffff' }}>
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
