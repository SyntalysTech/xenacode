'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  ArrowLeft,
  Link as LinkIcon,
  Mail,
  Phone,
  Wifi,
  CreditCard,
  Type,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type QRType = 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'vcard';

interface QRTypeInfo {
  id: QRType;
  name: string;
  icon: typeof Type;
  placeholder: string;
}

const qrTypes: QRTypeInfo[] = [
  { id: 'text', name: 'Texto', icon: Type, placeholder: 'Escribe cualquier texto...' },
  { id: 'url', name: 'URL', icon: LinkIcon, placeholder: 'https://ejemplo.com' },
  { id: 'email', name: 'Email', icon: Mail, placeholder: 'correo@ejemplo.com' },
  { id: 'phone', name: 'Teléfono', icon: Phone, placeholder: '+34 600 000 000' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, placeholder: '' },
  { id: 'vcard', name: 'Contacto', icon: CreditCard, placeholder: '' },
];

const colors = [
  { name: 'Negro', value: '#000000' },
  { name: 'Azul', value: '#172140' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Morado', value: '#8b5cf6' },
  { name: 'Rojo', value: '#ef4444' },
  { name: 'Naranja', value: '#f97316' },
];

export default function QRGeneratorPage() {
  const [qrType, setQrType] = useState<QRType>('text');
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WiFi specific fields
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // VCard specific fields
  const [vcardName, setVcardName] = useState('');
  const [vcardPhone, setVcardPhone] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [vcardOrg, setVcardOrg] = useState('');

  // Generate QR data based on type
  const getQRData = (): string => {
    switch (qrType) {
      case 'url':
        return text.startsWith('http') ? text : `https://${text}`;
      case 'email':
        return `mailto:${text}`;
      case 'phone':
        return `tel:${text.replace(/\s/g, '')}`;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
N:${vcardName}
FN:${vcardName}
TEL:${vcardPhone}
EMAIL:${vcardEmail}
ORG:${vcardOrg}
END:VCARD`;
      default:
        return text;
    }
  };

  // Generate QR code
  useEffect(() => {
    const data = getQRData();
    if (!data || (qrType === 'wifi' && !wifiSSID) || (qrType === 'vcard' && !vcardName)) {
      setQrDataUrl('');
      return;
    }

    QRCode.toDataURL(data, {
      width: size,
      margin: 2,
      color: {
        dark: color,
        light: bgColor,
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(''));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, qrType, color, bgColor, size, wifiSSID, wifiPassword, wifiEncryption, vcardName, vcardPhone, vcardEmail, vcardOrg]);

  const handleDownload = (format: 'png' | 'svg') => {
    const data = getQRData();
    if (!data) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrDataUrl;
      link.click();
    } else {
      QRCode.toString(data, {
        type: 'svg',
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: bgColor,
        },
      })
        .then((svg) => {
          const blob = new Blob([svg], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'qrcode.svg';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        });
    }
  };

  const currentType = qrTypes.find(t => t.id === qrType)!;
  const TypeIcon = currentType.icon;

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card-bg)]">
        <div className="container-custom py-6">
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a herramientas</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                QR Code Generator
              </h1>
              <p className="text-[var(--foreground-muted)]">
                Genera códigos QR personalizados en segundos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Options */}
          <div className="space-y-6">
            {/* Type Selector */}
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Tipo de QR
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {qrTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setQrType(type.id);
                        setText('');
                      }}
                      className={cn(
                        'p-3 rounded-xl flex flex-col items-center gap-1 transition-all',
                        qrType === type.id
                          ? 'bg-[var(--primary)] text-[var(--background)]'
                          : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Input */}
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <TypeIcon className="w-5 h-5" />
                Contenido
              </h2>

              {qrType === 'wifi' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--foreground-muted)] mb-1">
                      Nombre de la red (SSID)
                    </label>
                    <input
                      type="text"
                      value={wifiSSID}
                      onChange={(e) => setWifiSSID(e.target.value)}
                      placeholder="Mi WiFi"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--foreground-muted)] mb-1">
                      Contraseña
                    </label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="Contraseña de la red"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--foreground-muted)] mb-1">
                      Seguridad
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">Sin contraseña</option>
                    </select>
                  </div>
                </div>
              ) : qrType === 'vcard' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--foreground-muted)] mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={vcardName}
                      onChange={(e) => setVcardName(e.target.value)}
                      placeholder="Juan García"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--foreground-muted)] mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={vcardPhone}
                      onChange={(e) => setVcardPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--foreground-muted)] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={vcardEmail}
                      onChange={(e) => setVcardEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--foreground-muted)] mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={vcardOrg}
                      onChange={(e) => setVcardOrg(e.target.value)}
                      placeholder="Mi Empresa S.L."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                </div>
              ) : (
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={currentType.placeholder}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] resize-none"
                />
              )}
            </div>

            {/* Customization */}
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Personalización
              </h2>

              {/* Color */}
              <div className="mb-4">
                <label className="block text-sm text-[var(--foreground-muted)] mb-2">
                  Color del QR
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={cn(
                        'w-8 h-8 rounded-lg border-2 transition-all',
                        color === c.value ? 'border-[var(--primary)] scale-110' : 'border-transparent'
                      )}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer"
                    title="Color personalizado"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-[var(--foreground-muted)]">
                    Tamaño
                  </label>
                  <span className="text-sm font-mono text-[var(--primary)]">
                    {size}px
                  </span>
                </div>
                <input
                  type="range"
                  min={128}
                  max={512}
                  step={64}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--background-secondary)] accent-[var(--primary)]"
                />
              </div>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6 text-center">
                Vista previa
              </h2>

              <div className="flex justify-center mb-6">
                <div
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: bgColor }}
                >
                  {qrDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      width={size}
                      height={size}
                      className="max-w-full h-auto"
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center text-[var(--foreground-muted)]"
                      style={{ width: size, height: size }}
                    >
                      <div className="text-center">
                        <QrCode className="w-16 h-16 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Ingresa contenido para generar el QR</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <canvas ref={canvasRef} className="hidden" />

              {/* Download Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload('png')}
                  disabled={!qrDataUrl}
                  className={cn(
                    'flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all',
                    qrDataUrl
                      ? 'bg-[var(--primary)] text-[var(--background)] hover:opacity-90'
                      : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] cursor-not-allowed'
                  )}
                >
                  <Download className="w-5 h-5" />
                  PNG
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  disabled={!qrDataUrl}
                  className={cn(
                    'flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all',
                    qrDataUrl
                      ? 'bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]'
                      : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] cursor-not-allowed'
                  )}
                >
                  <Download className="w-5 h-5" />
                  SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
