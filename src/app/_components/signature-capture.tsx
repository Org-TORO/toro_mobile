import { useRef, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import SignatureCanvas, { SignatureViewRef } from "react-native-signature-canvas";
import { PenLine, RotateCcw, Trash2, X } from "lucide-react-native";

type SignatureCaptureProps = {
  title?: string;
  value: string | null;
  onChange: (signature: string | null) => void;
  boxStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export function SignatureCapture({
  title = "Chữ ký số",
  value,
  onChange,
  boxStyle,
  titleStyle,
}: SignatureCaptureProps) {
  const signatureRef = useRef<SignatureViewRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openPad = () => setIsModalVisible(true);
  const closePad = () => setIsModalVisible(false);

  const handleSave = () => {
    signatureRef.current?.readSignature();
  };

  const handleClearPad = () => {
    signatureRef.current?.clearSignature();
  };

  const handleSignature = (signature: string) => {
    onChange(signature);
    closePad();
  };

  return (
    <>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Pressable style={({ pressed }) => [styles.signatureBox, boxStyle, pressed && styles.pressed]} onPress={openPad}>
        {value ? (
          <Image resizeMode="contain" source={{ uri: value }} style={styles.signaturePreview} />
        ) : (
          <>
            <PenLine color="#40516B" size={27} strokeWidth={2.2} />
            <Text style={styles.signatureText}>Nhấn để ký điện tử</Text>
          </>
        )}
      </Pressable>

      {value ? (
        <View style={styles.toolRow}>
          <Pressable onPress={openPad} style={({ pressed }) => [styles.toolButton, pressed && styles.pressed]}>
            <PenLine color="#0D2B57" size={16} strokeWidth={2.4} />
            <Text style={styles.toolButtonText}>Sửa chữ ký</Text>
          </Pressable>
          <Pressable
            onPress={() => onChange(null)}
            style={({ pressed }) => [styles.toolButton, styles.dangerButton, pressed && styles.pressed]}
          >
            <Trash2 color="#D64A4A" size={16} strokeWidth={2.4} />
            <Text style={[styles.toolButtonText, styles.dangerText]}>Xóa</Text>
          </Pressable>
        </View>
      ) : null}

      <Modal animationType="slide" onRequestClose={closePad} transparent visible={isModalVisible}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalPanel}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ký điện tử</Text>
              <Pressable accessibilityLabel="Đóng" onPress={closePad} style={styles.iconButton}>
                <X color="#172B4D" size={21} strokeWidth={2.4} />
              </Pressable>
            </View>

            <View style={styles.canvasFrame}>
              <SignatureCanvas
                ref={signatureRef}
                autoClear={false}
                dataURL={value ?? undefined}
                descriptionText=""
                imageType="image/png"
                minWidth={1.4}
                maxWidth={3.2}
                onEmpty={() => onChange(null)}
                onOK={handleSignature}
                penColor="#172B4D"
                trimWhitespace
                webStyle={signatureWebStyle}
              />
            </View>

            <View style={styles.modalActions}>
              <Pressable
                onPress={handleClearPad}
                style={({ pressed }) => [styles.modalSecondaryButton, pressed && styles.pressed]}
              >
                <RotateCcw color="#0D2B57" size={17} strokeWidth={2.5} />
                <Text style={styles.modalSecondaryText}>Xóa nét vẽ</Text>
              </Pressable>
              <Pressable onPress={handleSave} style={({ pressed }) => [styles.modalPrimaryButton, pressed && styles.pressed]}>
                <Text style={styles.modalPrimaryText}>Lưu chữ ký</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const signatureWebStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
  }
  .m-signature-pad--body {
    border: none;
  }
  .m-signature-pad--footer {
    display: none;
    margin: 0;
  }
  body, html {
    background: #FFFFFF;
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
`;

const styles = StyleSheet.create({
  title: {
    color: "#172B4D",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 9,
  },
  signatureBox: {
    width: "100%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#D9E6F5",
    borderRadius: 10,
    borderStyle: "dashed",
    backgroundColor: "#FBFDFF",
    overflow: "hidden",
  },
  signaturePreview: {
    width: "94%",
    height: "86%",
  },
  signatureText: {
    color: "#A0AFC1",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 9,
  },
  toolRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 9,
    width: "100%",
  },
  toolButton: {
    minHeight: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9E6F5",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },
  dangerButton: {
    borderColor: "#F1CACA",
  },
  toolButtonText: {
    color: "#0D2B57",
    fontSize: 11,
    fontWeight: "900",
    marginLeft: 6,
  },
  dangerText: {
    color: "#D64A4A",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(13, 43, 87, 0.38)",
  },
  modalPanel: {
    maxHeight: "86%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingBottom: 24,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  modalHeader: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: {
    color: "#172B4D",
    fontSize: 17,
    fontWeight: "900",
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#F1F6FC",
  },
  canvasFrame: {
    height: 320,
    borderWidth: 1.2,
    borderColor: "#D9E6F5",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 16,
  },
  modalSecondaryButton: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.1,
    borderColor: "#D9E6F5",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    marginRight: 6,
  },
  modalSecondaryText: {
    color: "#0D2B57",
    fontSize: 13,
    fontWeight: "900",
    marginLeft: 7,
  },
  modalPrimaryButton: {
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: "#0D2B57",
    marginLeft: 6,
  },
  modalPrimaryText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
